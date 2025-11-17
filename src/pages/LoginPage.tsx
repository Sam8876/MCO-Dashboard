import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoginForm from '../LoginForm'

interface LoginPageConfig {
  title: string
  subtitle: string
  redirectPath: string
}

const loginConfigs: Record<string, LoginPageConfig> = {
  'comdt-md': {
    title: 'Comd & MD',
    subtitle: 'Commander & Managing Director',
    redirectPath: '/comdt-md-dashboard'
  },
  'gm-prod': {
    title: 'GM Prod',
    subtitle: 'General Manager Production',
    redirectPath: '/gm-prod'
  },
  'gm-wks-mtrl': {
    title: 'GM WKS MTRL',
    subtitle: 'General Manager Workshop Material',
    redirectPath: '/gm-wks-mtrl-dashboard'
  },
  'gm-wks-tech': {
    title: 'GM WKS (Tech)',
    subtitle: 'General Manager Workshop Technical',
    redirectPath: '/gm-wks-tech'
  },
  'gm-admin': {
    title: 'GM Admin',
    subtitle: 'General Manager Administration',
    redirectPath: '/gm-admin'
  },
  'gm-dashboard': {
    title: 'GM Dashboard',
    subtitle: 'General Manager Dashboard',
    redirectPath: '/gm-wks'
  },
  'dgm-dashboard': {
    title: 'DGM Dashboard',
    subtitle: 'Deputy General Manager Dashboard',
    redirectPath: '/dgm-mtrl'
  },
  'dgm-wks-mtrl': {
    title: 'DGM WKS MTRL',
    subtitle: 'Deputy General Manager Workshop Material',
    redirectPath: '/dgm-mtrl'
  },
  'dgm-purchase': {
    title: 'DGM PURCHASE',
    subtitle: 'Deputy General Manager Purchase',
    redirectPath: '/dgm-purchase'
  }
}

export default function LoginPage() {
  const { loginType } = useParams<{ loginType: string }>()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const config = loginType ? loginConfigs[loginType] : null

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Login Page</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <LoginForm
        title={config.title}
        subtitle={config.subtitle}
        onLoginSuccess={() => {
          setIsLoggedIn(true)
          navigate(config.redirectPath)
        }}
      />
    )
  }

  return null
}

