import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        items: [],
        totalItems: 0
    } as BooksType,
    reducers: {
        getBooks: (state, action: PayloadAction<{items: Array<BookType>, totalItems: number}>) => {
            state.items = action.payload.items
            state.totalItems = action.payload.totalItems
        }
    }
})

export const {getBooks} = counterSlice.actions

export default counterSlice.reducer


export type BooksType = {
    items: Array<BookType>
    totalItems: number
}
export type BookType = {
    kind: string,
    id: string,
    volumeInfo: {
        title: string
        authors: Array<string>
        publisher: string
        publishedDate: string
        description: string
        categories: Array<string>,
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        },
        language: string,
        previewLink: string,
        infoLink: string,
        canonicalVolumeLink: string
    },
    buyLink: string,
    searchInfo: {
        textSnippet: string
    }
}