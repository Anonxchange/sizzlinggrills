
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
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
