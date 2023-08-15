import {INavigationItem} from "./interfaces/navigation.ts";

export const menuItems: INavigationItem[] = [
    {
        to: '/',
        body: 'Quotes'
    },
    {
        to: '/add-quote',
        body: 'Submit new quote'
    },
]
export const categoryItems: INavigationItem[] = [
    {
        to: '/',
        body: 'All'
    },
    {
        to: 'quotes/stars-wars',
        body: 'Stars wars'
    },
    {
        to: 'quotes/famous-people',
        body: 'Famous people'
    },
    {
        to: 'quotes/saying',
        body: 'Saying'
    },
    {
        to: 'quotes/humour',
        body: 'Humour'
    },
    {
        to: 'quotes/motivational',
        body: 'Motivational'
    },
]