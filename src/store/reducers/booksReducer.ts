import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {api} from '../../api/api.ts';
import {OrderFilterType} from '../../components/header/Header.tsx';
import {changeCategory, setSearchTerm, setStartIndex} from './filterReducer.ts';

export const fetchBooks = createAsyncThunk('books/getBooksThunk', async (arg: {
    term: string,
    orderBy: OrderFilterType
    category: string
}, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setIsLoading(true))
    try {
        dispatch(setStartIndex(8))
        dispatch(setSearchTerm(arg.term))
        dispatch(changeCategory(arg.category))
        return await api.fetchBooks(arg.term, arg.orderBy, arg.category)
    } catch (e) {
        rejectWithValue(null)
    } finally {
        dispatch(setIsLoading(false))
    }
})

export const loadBooksThunk = createAsyncThunk('books/loadBooksThunk', async (_, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(setIsLoading(true))
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const index = getState().filter.startIndex + 30
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const term = getState().filter.term
        dispatch(setStartIndex(index))
        return await api.loadMoreBooks(term, index)
    } catch (e) {
        rejectWithValue(null)
    } finally {
        dispatch(setIsLoading(false))
    }
})

export const slice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        totalItems: 0,
        isLoading: false
    } as BooksType,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.items = action.payload.items
            state.totalItems = action.payload.totalItems
        })
        builder.addCase(loadBooksThunk.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload.items]
        })
    }
})

export const {setIsLoading} = slice.actions

export default slice.reducer


export type BooksType = {
    items: Array<BookType>
    totalItems: number
    isLoading: boolean
}
export type BookType = {
    kind: string
    id: string
    volumeInfo: {
        title: string
        authors: Array<string>
        publisher: string
        publishedDate: string
        description: string
        categories: Array<string>
        pageCount: number
        imageLinks: {
            large: string
            medium: string
            smallThumbnail: string
            thumbnail: string
        },
        language: string
        previewLink: string
        infoLink: string
        canonicalVolumeLink: string
    },
    buyLink: string
    searchInfo: {
        textSnippet: string
    }
}