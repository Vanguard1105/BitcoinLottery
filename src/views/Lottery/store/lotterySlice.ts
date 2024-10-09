import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiCreateLottery,
    apiDeleteLottery,
} from '@/services/LotteryService'

type Lottery = {
    name: string
    description: string
    ticket_price: number
    total_ticket: number
    start_time: Date
    buy_time: Date
    end_time: Date
    winner: string
}

type Lotteries = Lottery[]

export type LotteryListState = {
    loading: boolean
    lotteryLists: Lotteries
}

const initialState: LotteryListState = {
    loading: false,
    lotteryLists: []
}

export const SLICE_NAME = 'lotteryTicketList'

export const createLottery = createAsyncThunk(
    SLICE_NAME + '/createLottery',
    async (data: any) => {
        const response = await apiCreateLottery<
            Lottery,
            any
        >(data)
        return response.data
    }
)
export const deleteLottery = createAsyncThunk(
    SLICE_NAME + '/createLottery',
    async (data: any) => {
        const response = await apiDeleteLottery<
            Lottery,
            any
        >(data)
        return response.data
    }
)

const ticketListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLottery.fulfilled, (state, action) => {
                state.lotteryLists = [...state.lotteryLists, action.payload]
                state.loading = false
            })
            .addCase(createLottery.pending, (state) => {
                state.loading = true
            })
    },
})

export default ticketListSlice.reducer
