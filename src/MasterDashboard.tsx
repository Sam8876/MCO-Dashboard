import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MasterDashboard() {
  const navigate = useNavigate()

  const handleComdtMDClick = () => {
    navigate('/login/comdt-md')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 tracking-tight">
            512
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-4 tracking-wide">
            Army Base Workshop
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto"></div>
        </div>

        {/* Comd & MD Module Button */}
        <div className="w-full max-w-md">
          <button
            onClick={handleComdtMDClick}
            className="group relative w-full bg-gradient-to-br from-blue-600 to-blue-800 text-white py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
          >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button Content */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="text-3xl font-bold tracking-wide">Comd & MD</div>
              <div className="text-sm font-medium opacity-90">Commander & Managing Director</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Access Dashboard</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

