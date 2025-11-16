import React from 'react'
import { useNavigate } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  subtitle: string
  onLogin: () => void
  gradient: string
}

function DashboardCard({ title, subtitle, onLogin, gradient }: DashboardCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
      <div className={`h-2 ${gradient}`}></div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{subtitle}</p>
        <button
          onClick={onLogin}
          className={`w-full ${gradient} text-white py-3.5 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group`}
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

export default function SectionDashboard() {
  const navigate = useNavigate()

  const gmCards = [
    {
      title: 'GM WKS (MTRL)',
      subtitle: 'General Manager Workshop Material',
      path: '/gm-wks',
      gradient: 'bg-gradient-to-br from-emerald-600 to-emerald-800'
    },
    {
      title: 'GM Prod',
      subtitle: 'General Manager Production',
      path: '/gm-prod',
      gradient: 'bg-gradient-to-br from-rose-600 to-rose-800'
    }
  ]

  const dgmCards = [
    {
      title: 'DGM (MTRL)',
      subtitle: 'Deputy General Manager Material',
      path: '/dgm-mtrl',
      gradient: 'bg-gradient-to-br from-purple-600 to-purple-800'
    },
    {
      title: 'DGM (PURCHASE)',
      subtitle: 'Deputy General Manager Purchase',
      path: '/dgm-purchase',
      gradient: 'bg-gradient-to-br from-orange-600 to-orange-800'
    },
    {
      title: 'DGM Prod',
      subtitle: 'Deputy General Manager Production',
      path: '/dgm-prod',
      gradient: 'bg-gradient-to-br from-cyan-600 to-cyan-800'
    }
  ]

  const sectionIncharge = [
    {
      title: 'Section Incharge',
      subtitle: 'Section Incharge Dashboard',
      path: '/comdt-md',
      gradient: 'bg-gradient-to-br from-blue-600 to-blue-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">512 Army Base ERP</h1>
              <p className="text-base font-bold text-gray-900">Material Control Organization</p>
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

        <div className="space-y-8">
          {/* GM Cards Row - Center Aligned */}
          <div className="flex flex-wrap justify-center gap-8">
            {gmCards.map((section) => (
              <div key={section.path} className="w-full sm:w-auto">
                <DashboardCard
                  title={section.title}
                  subtitle={section.subtitle}
                  gradient={section.gradient}
                  onLogin={() => navigate(section.path)}
                />
              </div>
            ))}
          </div>

          {/* DGM Cards Row - Center Aligned */}
          <div className="flex flex-wrap justify-center gap-8">
            {dgmCards.map((section) => (
              <div key={section.path} className="w-full sm:w-auto">
                <DashboardCard
                  title={section.title}
                  subtitle={section.subtitle}
                  gradient={section.gradient}
                  onLogin={() => navigate(section.path)}
                />
              </div>
            ))}
          </div>

          {/* Section Incharge Row - Center Aligned */}
          <div className="flex flex-wrap justify-center gap-8">
            {sectionIncharge.map((section) => (
              <div key={section.path} className="w-full sm:w-auto">
                <DashboardCard
                  title={section.title}
                  subtitle={section.subtitle}
                  gradient={section.gradient}
                  onLogin={() => navigate(section.path)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">Secure Access Portal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
