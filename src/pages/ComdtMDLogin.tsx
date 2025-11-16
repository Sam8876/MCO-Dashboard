import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'
import MCODashboard from './MCODashboard'
import MPOLogin from './MPOLogin'
import LPSLogin from './LPSLogin'
import LPOLogin from './LPOLogin'
import ESSLogin from './ESSLogin'

export default function ComdtMDLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedModule, setSelectedModule] = useState('')

  if (!isLoggedIn) {
    return (
      <LoginForm
        title="Comdt & MD"
        subtitle="Commandant & Managing Director Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all"
              >
                512 Army Base ERP
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Comdt & MD</div>
                <div className="text-xs text-gray-600">Commandant & Managing Director</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedModule ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Select Module</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* MCO Card */}
              <div
                onClick={() => setSelectedModule('mco')}
                className="bg-white rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-32 rounded-t-xl flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">MCO</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Material Control Office</h4>
                  <p className="text-gray-600 text-sm mb-4">Manage material control, inventory, and reporting</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LPO Card */}
              <div
                onClick={() => setSelectedModule('lpo')}
                className="bg-white rounded-xl shadow-lg border-2 border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-green-500 to-green-600 h-32 rounded-t-xl flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">LPO</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Local Purchase Order</h4>
                  <p className="text-gray-600 text-sm mb-4">Create and manage local purchase orders</p>
                  <div className="flex items-center text-green-600 font-semibold text-sm">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ESS Card */}
              <div
                onClick={() => setSelectedModule('ess')}
                className="bg-white rounded-xl shadow-lg border-2 border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-32 rounded-t-xl flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">ESS</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Expendable Store Section</h4>
                  <p className="text-gray-600 text-sm mb-4">Manage expendable stores and inventory</p>
                  <div className="flex items-center text-purple-600 font-semibold text-sm">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LPS Card */}
              <div
                onClick={() => setSelectedModule('lps')}
                className="bg-white rounded-xl shadow-lg border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-32 rounded-t-xl flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">LPS</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Local Purchase Store</h4>
                  <p className="text-gray-600 text-sm mb-4">Manage local purchase store operations</p>
                  <div className="flex items-center text-orange-600 font-semibold text-sm">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* MPO Card */}
              <div
                onClick={() => setSelectedModule('mpo')}
                className="bg-white rounded-xl shadow-lg border-2 border-indigo-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 h-32 rounded-t-xl flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">MPO</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Material Provisioning Office</h4>
                  <p className="text-gray-600 text-sm mb-4">Handle material provisioning and requirements</p>
                  <div className="flex items-center text-indigo-600 font-semibold text-sm">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedModule === 'mco' && 'MCO - Material Control Office'}
                {selectedModule === 'lpo' && 'LPO - Local Purchase Order'}
                {selectedModule === 'ess' && 'ESS - Expendable Store Section'}
                {selectedModule === 'lps' && 'LPS - Local Purchase Store'}
                {selectedModule === 'mpo' && 'MPO - Material Provisioning Office'}
              </h2>
              <button
                onClick={() => setSelectedModule('')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Back to Modules
              </button>
            </div>
            {/* Module Dashboards */}
            {selectedModule === 'mco' && <MCODashboard />}
            {selectedModule === 'lpo' && <LPOLogin />}
            {selectedModule === 'ess' && <ESSLogin />}
            {selectedModule === 'lps' && <LPSLogin />}
            {selectedModule === 'mpo' && <MPOLogin />}
          </div>
        )}
      </div>
    </div>
  )
}
