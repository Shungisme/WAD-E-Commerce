import { createAsyncThunk } from '@reduxjs/toolkit'

// Simulated API call
const fetchCount = (amount = 1): Promise<{ data: number }> => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
}

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount)
    return response.data
  }
)