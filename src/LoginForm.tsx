import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  title: string
  subtitle: string
  onLoginSuccess?: () => void
  color?: 'blue' | 'green'
}

export default function LoginForm({ title, subtitle, onLoginSuccess, color = 'blue' }: LoginFormProps) {
  const isGreen = color === 'green';
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', { userId, password, section: title })
    // Add your authentication logic here
    if (onLoginSuccess) {
      onLoginSuccess()
    }
  }

  const navButtons = [
    { label: 'MCO', path: '/mco' },
    { label: 'LPO', path: '/lpo' },
    { label: 'ESS', path: '/ess' },
    { label: 'LPS', path: '/lps' },
    { label: 'MPO', path: '/mpo' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/')}
                className={`text-2xl font-bold bg-gradient-to-r ${isGreen ? 'from-green-600 to-green-800 hover:from-green-700 hover:to-green-900' : 'from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} bg-clip-text text-transparent transition-all`}
              >
                512 Army Base ERP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className={`bg-gradient-to-r ${isGreen ? 'from-green-600 to-green-800' : 'from-blue-600 to-blue-800'} px-8 py-10 text-center`}>
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg className={`w-10 h-10 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <p className={`${isGreen ? 'text-green-100' : 'text-blue-100'} text-sm`}>{subtitle}</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-6">
                <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${isGreen ? 'focus:ring-green-500' : 'focus:ring-blue-500'} focus:border-transparent transition-all`}
                    placeholder="Enter your user ID"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${isGreen ? 'focus:ring-green-500' : 'focus:ring-blue-500'} focus:border-transparent transition-all`}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r ${isGreen ? 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white py-4 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2`}
              >
                <span>Sign In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className={`text-sm text-gray-600 ${isGreen ? 'hover:text-green-600' : 'hover:text-blue-600'} font-medium transition-colors flex items-center justify-center gap-2 mx-auto`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Dashboard</span>
                </button>
              </div>
            </form>

            {/* Security Badge */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">Secure Encrypted Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
