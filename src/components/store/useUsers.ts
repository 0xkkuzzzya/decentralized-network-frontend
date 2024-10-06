import { createStore } from "./store";

type Link = {
        title: string,
        url: string,
}

export interface Profile {
    profile: {
        name: string,
        username: string,
        bio: string,
        avatar: string,
        links: Link[]
    }
}


export const defaultStateUser: Profile = {
    profile: {
        name: "",
        username: '',
        bio: '',
        avatar: '',
        links: []
    }
};

export interface Post {
    post: {
        content: string
        timestamp: string
    }
}

export interface FullPost {
    address: string,
    post: {
        content: string,
        timestamp: string
    }
}

export interface FullPosts {
    posts: FullPost[]
}


export const [useUser] = createStore(defaultStateUser);
export const [usePosts] = createStore(<FullPosts>{ posts: []});