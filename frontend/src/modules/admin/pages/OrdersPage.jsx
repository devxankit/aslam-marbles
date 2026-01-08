import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import baseClient from '../../../services/api/baseClient'
import { Toaster, toast } from 'react-hot-toast'
import { exportToCSV } from '../../../utils/exportUtils'


// Utility function for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

// Utility function for updating status - can be moved to API service
const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await baseClient.put(`/admin/orders/${orderId}/status`, { status })
    return response
  } catch (error) {
    throw error
  }
}


const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null) // For modal
  const [filterStatus, setFilterStatus] = useState('all')

  // Fetch Orders
  const fetchOrders = async () => {
    setLoading(true)
    try {
      // Updated to use the correct API endpoint
      const response = await baseClient.get('/admin/orders')
      if (response && response.success) {
        setOrders(response.orders)
      } else {
        toast.error('Failed to load orders')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Error loading orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const promise = updateOrderStatus(orderId, newStatus)

      await toast.promise(promise, {
        loading: 'Updating status...',
        success: 'Order status updated!',
        error: 'Failed to update status'
      })

      // Refresh local state
      setOrders(orders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      ))

      // If modal is open, update selected order too
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }))
      }

    } catch (error) {
      console.error(error)
    }
  }

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus)

  const handleExport = () => {
    if (!orders.length) return toast.error('No data to export')

    const exportData = orders.map(order => ({
      'Order ID': order.orderId,
      'Date': new Date(order.createdAt).toLocaleDateString(),
      'Customer': order.customer?.name || 'N/A',
      'Email': order.customer?.email || 'N/A',
      'Phone': order.customer?.phone || 'N/A',
      'Total Amount': order.total,
      'Currency': order.currency,
      'Status': order.status,
      'Items Count': order.items?.length || 0,
      'Payment ID': order.razorpayPaymentId || 'N/A'
    }))

    exportToCSV(exportData, `orders_export_${new Date().toISOString().split('T')[0]}`)
    toast.success('Orders exported successfully!')
  }


  // Status Badge Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <Toaster position="top-right" />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage, process and track customer orders</p>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-2">
            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 text-sm rounded-lg capitalize transition-colors ${filterStatus === status
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List / Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
              <p className="text-gray-500">No orders match the current filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.orderId ? order.orderId.substring(0, 8).toUpperCase() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {order.customerDetails?.firstName || order.customerDetails?.lastName
                              ? `${order.customerDetails.firstName || ''} ${order.customerDetails.lastName || ''}`.trim()
                              : (order.customerDetails?.name || 'Guest')}
                          </span>
                          <span className="text-xs text-gray-500">{order.customerDetails?.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                        <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(order.finalTotal)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status || order.paymentStatus)}`}>
                          {order.status || order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                        {order.razorpayPaymentId || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#8B7355] hover:text-[#736044] font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <p className="text-sm text-gray-500">ID: #{selectedOrder.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">

              {/* Status Control */}
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div>
                  <p className="text-sm font-medium text-blue-900">Current Status</p>
                  <div className={`mt-1 inline-block px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(selectedOrder.status || selectedOrder.paymentStatus)} uppercase`}>
                    {selectedOrder.status || selectedOrder.paymentStatus}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 mr-2">Update Status:</p>
                  <select
                    value={selectedOrder.status || selectedOrder.paymentStatus}
                    onChange={(e) => handleStatusChange(selectedOrder.orderId, e.target.value)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-[#8B7355] focus:ring focus:ring-[#8B7355] focus:ring-opacity-50 py-2 pl-3 pr-8 bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Customer Info</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-900 w-20 inline-block">Name:</span>
                      {selectedOrder.customerDetails?.firstName || selectedOrder.customerDetails?.lastName
                        ? `${selectedOrder.customerDetails.firstName || ''} ${selectedOrder.customerDetails.lastName || ''}`.trim()
                        : (selectedOrder.customerDetails?.name || 'N/A')}
                    </p>
                    <p><span className="font-medium text-gray-900 w-20 inline-block">Email:</span> {selectedOrder.customerDetails?.email}</p>
                    <p><span className="font-medium text-gray-900 w-20 inline-block">Phone:</span> {selectedOrder.customerDetails?.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Shipping Address</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">{selectedOrder.customerDetails?.address}</p>
                    {selectedOrder.customerDetails?.apartment && <p>{selectedOrder.customerDetails?.apartment}</p>}
                    <p>
                      {selectedOrder.customerDetails?.city}, {selectedOrder.customerDetails?.state} {selectedOrder.customerDetails?.pinCode}
                    </p>
                    <p>{selectedOrder.customerDetails?.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Items Ordered</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-white p-3 rounded shadow-sm">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="text-xs text-gray-500 mt-1 space-x-3">
                          <span>Qty: {item.quantity}</span>
                          <span>Price: {formatCurrency(item.price)}</span>
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4 flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-[#8B7355]">{formatCurrency(selectedOrder.finalTotal)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default OrdersPage
