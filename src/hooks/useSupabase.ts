
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useSupabase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Example: Fetch data from a table
  const fetchData = async (tableName: string) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
      
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Example: Insert data into a table
  const insertData = async (tableName: string, data: any) => {
    try {
      setLoading(true)
      setError(null)
      const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
      
      if (error) throw error
      return insertedData
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Example: Authentication
  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Attempting sign up for email:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      console.log('Sign up response:', { data, error })
      
      if (error) {
        console.error('Sign up error:', error)
        
        // Provide more specific error messages
        let userMessage = error.message
        if (error.code === 'unexpected_failure') {
          userMessage = 'Email confirmation is required but not properly configured. Please contact support or try again later.'
        }
        
        setError(userMessage)
        return { data: null, error: userMessage }
      }
      return { data, error: null }
    } catch (err) {
      console.error('Sign up catch block:', err)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Attempting sign in for email:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log('Sign in response:', { data, error })
      
      if (error) {
        console.error('Sign in error:', error)
        setError(error.message)
        return { data: null, error: error.message }
      }
      return { data, error: null }
    } catch (err) {
      console.error('Sign in catch block:', err)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    fetchData,
    insertData,
    signUp,
    signIn,
    signOut,
  }
}
