import React, { useState, useEffect } from 'react';
import { Calendar, Book, Clock, AlertCircle, CheckCircle, X, Users } from 'lucide-react';

const BookRenewalSimulation = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 201,
      title: "Lập trình Python",
      author: "Nguyễn Văn A",
      borrowDate: "2025-06-10",
      dueDate: "2025-06-30",
      renewalCount: 0,
      maxRenewals: 3,
      waitingList: 0,
      isOverdue: false
    },
    {
      id: 202,
      title: "Java căn bản",
      author: "Trần Thị B", 
      borrowDate: "2025-05-15",
      dueDate: "2025-07-15",
      renewalCount: 3,
      maxRenewals: 3,
      waitingList: 0,
      isOverdue: false
    },
    {
      id: 203,
      title: "React Advanced",
      author: "Lê Văn C",
      borrowDate: "2025-06-05",
      dueDate: "2025-06-20",
      renewalCount: 1,
      maxRenewals: 3,
      waitingList: 0,
      isOverdue: true
    },
    {
      id: 204,
      title: "Machine Learning",
      author: "Phạm Thị D",
      borrowDate: "2025-06-12",
      dueDate: "2025-06-29",
      renewalCount: 0,
      maxRenewals: 3,
      waitingList: 2,
      isOverdue: false
    }
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const [renewalHistory, setRenewalHistory] = useState({
    202: [
      { date: "2025-06-15", days: 14, newDueDate: "2025-06-29" },
      { date: "2025-06-22", days: 14, newDueDate: "2025-07-06" },
      { date: "2025-06-29", days: 14, newDueDate: "2025-07-15" }
    ]
  });

  const getDaysUntilDue = (dueDate) => {
    const today = new Date('2025-06-24');
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRenewClick = (book) => {
    if (book.isOverdue) {
      showNotification("Không thể gia hạn sách quá hạn. Vui lòng trả sách trước.", 'error');
      return;
    }
    
    if (book.renewalCount >= book.maxRenewals) {
      showNotification("Đã hết lượt gia hạn (3/3)", 'error');
      return;
    }
    
    if (book.waitingList > 0) {
      showNotification(`Không thể gia hạn. Có ${book.waitingList} người đang chờ sách này`, 'error');
      return;
    }

    const newDueDate = new Date(book.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14);
    
    setShowConfirmModal({
      ...book,
      newDueDate: newDueDate.toISOString().split('T')[0]
    });
  };

  const confirmRenewal = () => {
    const book = showConfirmModal;
    
    // Giả lập lỗi server (5% chance)
    if (Math.random() < 0.05) {
      showNotification("Không thể gia hạn. Vui lòng thử lại sau.", 'error');
      setShowConfirmModal(null);
      return;
    }

    setBorrowedBooks(prev => prev.map(b => 
      b.id === book.id 
        ? { 
            ...b, 
            dueDate: book.newDueDate,
            renewalCount: b.renewalCount + 1
          }
        : b
    ));

    // Cập nhật lịch sử gia hạn
    setRenewalHistory(prev => ({
      ...prev,
      [book.id]: [
        ...(prev[book.id] || []),
        {
          date: '2025-06-24',
          days: 14,
          newDueDate: book.newDueDate
        }
      ]
    }));

    showNotification("Gia hạn thành công! Hạn trả mới: " + formatDate(book.newDueDate));
    setShowConfirmModal(null);
  };

  const getStatusColor = (book) => {
    if (book.isOverdue) return 'text-red-600';
    const daysLeft = getDaysUntilDue(book.dueDate);
    if (daysLeft <= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusText = (book) => {
    if (book.isOverdue) {
      const overdueDays = Math.abs(getDaysUntilDue(book.dueDate));
      return `Quá hạn ${overdueDays} ngày`;
    }
    const daysLeft = getDaysUntilDue(book.dueDate);
    if (daysLeft === 0) return 'Hết hạn hôm nay';
    if (daysLeft === 1) return 'Còn 1 ngày';
    return `Còn ${daysLeft} ngày`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-600" />
          Sách đang mượn
        </h1>

        {/* Notification */}
        {notification && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        )}

        {/* Books List */}
        <div className="space-y-4">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">Tác giả: {book.author}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Mượn: {formatDate(book.borrowDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Hạn trả: {formatDate(book.dueDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className={`font-medium ${getStatusColor(book)}`}>
                      {getStatusText(book)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Gia hạn: {book.renewalCount}/{book.maxRenewals}
                    </span>
                    {book.waitingList > 0 && (
                      <span className="flex items-center gap-1 text-sm text-orange-600">
                        <Users className="w-4 h-4" />
                        {book.waitingList} người chờ
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Renewal Button */}
                  {book.isOverdue ? (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Trả sách
                    </button>
                  ) : book.renewalCount >= book.maxRenewals ? (
                    <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
                      Hết lượt gia hạn
                    </span>
                  ) : book.waitingList > 0 ? (
                    <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg cursor-not-allowed">
                      Có người chờ
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleRenewClick(book)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Gia hạn
                    </button>
                  )}

                  {/* History Button */}
                  {renewalHistory[book.id] && (
                    <button 
                      onClick={() => setShowHistory(book.id)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Lịch sử
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Xác nhận gia hạn</h3>
              <p className="text-gray-600 mb-2">
                Bạn có muốn gia hạn sách <strong>"{showConfirmModal.title}"</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Hạn trả mới: <strong>{formatDate(showConfirmModal.newDueDate)}</strong> (thêm 14 ngày)
              </p>
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowConfirmModal(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button 
                  onClick={confirmRenewal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Modal */}
        {showHistory && renewalHistory[showHistory] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Lịch sử gia hạn</h3>
                <button 
                  onClick={() => setShowHistory(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {renewalHistory[showHistory].map((renewal, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="text-sm font-medium">
                      Lần {index + 1}: {formatDate(renewal.date)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Gia hạn {renewal.days} ngày → Hạn mới: {formatDate(renewal.newDueDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRenewalSimulation;