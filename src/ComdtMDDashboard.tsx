import React from 'react'
import { useNavigate } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  subtitle: string
  gradient: string
  loginRoute: string
}

function DashboardCard({ title, subtitle, gradient, loginRoute }: DashboardCardProps) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(loginRoute)
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] h-full flex flex-col">
      <div className={`h-2 ${gradient}`}></div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">{subtitle}</p>
        <button
          onClick={handleCardClick}
          className={`w-full ${gradient} text-white py-3.5 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-auto`}
        >
          <span>Access Dashboard</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ComdtMDDashboard() {
  const navigate = useNavigate()

  const gmCards = [
    {
      title: 'GM Prod',
      subtitle: 'General Manager Production',
      gradient: 'bg-gradient-to-br from-rose-600 to-rose-800',
      loginRoute: '/login/gm-prod'
    },
    {
      title: 'GM WKS MTRL',
      subtitle: 'General Manager Workshop Material',
      gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
      loginRoute: '/sections-dashboard'
    },
    {
      title: 'GM WKS (Tech)',
      subtitle: 'General Manager Workshop Technical',
      gradient: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
      loginRoute: '/login/gm-wks-tech'
    },
    {
      title: 'GM Admin',
      subtitle: 'General Manager Administration',
      gradient: 'bg-gradient-to-br from-amber-600 to-amber-800',
      loginRoute: '/login/gm-admin'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all"
              >
                512 Army Base ERP
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Comd & MD</div>
                <div className="text-xs text-gray-600">Commander & Managing Director</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Module</h2>
          <p className="text-gray-600">Choose a module to access its dashboard</p>
        </div>

        {/* GM Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gmCards.map((card, index) => (
            <div key={index} className="w-full">
              <DashboardCard
                title={card.title}
                subtitle={card.subtitle}
                gradient={card.gradient}
                loginRoute={card.loginRoute}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

