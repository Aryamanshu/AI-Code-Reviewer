import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from './components/Layout/Layout'
import CodeEditor from './components/CodeEditor/CodeEditor'
import ReviewDisplay from './components/ReviewDisplay/ReviewDisplay'
import './App.css'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Set dark mode on component mount
  useEffect(() => {
    document.body.classList.add('dark-theme')
  }, [])

  async function handleReviewCode(codeToReview, language) {
    try {
      setIsLoading(true)
      setError(null)
      setReview('')

      console.log(`Reviewing ${language} code...`)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await axios.post(`${API_URL}/ai/get-review`, { code: codeToReview })
      setReview(response.data.data || response.data)
    } catch (err) {
      console.error('Error reviewing code:', err)
      setError(err.response?.data?.error?.message || 'Failed to get code review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="code-review-container">
        <div className="editor-panel">
          <CodeEditor
            code={code}
            setCode={setCode}
            onReviewClick={handleReviewCode}
          />
        </div>
        <div className="review-panel">
          <ReviewDisplay
            review={review}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </Layout>
  )
}



export default App