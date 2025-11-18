import React, { useEffect, useState } from 'react'
import { requestAPI } from '../Services/APIs'
import Sidebar from '../Dashboards/User/Sidebar'
import BottomNav from '../Dashboards/User/BottomNav'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) {
      setLoading(false)
      setError('')
      return
    }
    requestAPI
      .getByUser({ email: user.email })
      .then((res) => {
        setRequests(res.data.requests || [])
        setLoading(false)
        setError('')
      })
      .catch((e) => {
        // Hide technical errors, just show empty state
        console.error('Error loading requests:', e)
        setRequests([])
        setLoading(false)
        setError('')
      })
  }, [])

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex">
      <Sidebar isOpen={false} onClose={() => {}} />

      <div className="flex-1 lg:ml-0 overflow-hidden">
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 h-20 sm:h-24">
          <div className="flex items-center justify-between p-4 sm:p-6 h-full">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>My Requests</h1>
              <p className="text-sm sm:text-base text-gray-600">All your VIN requests in one place</p>
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 shadow">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIN</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.map((r) => (
                        <tr key={r._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{r.vin}</td>
                          <td className="px-4 py-3">{r.vehicleDetails?.vehicle || '-'}</td>
                          <td className="px-4 py-3 capitalize">{r.status}</td>
                          <td className="px-4 py-3">{new Date(r.requestDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {requests.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                            No requests yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    <BottomNav />
    </>
  )
}

export default Requests



