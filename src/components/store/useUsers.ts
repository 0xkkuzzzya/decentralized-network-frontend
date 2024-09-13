import { createStore } from "./store";

interface User {
    username: string;
    photo: string;
    followers: string;
    totalPost: number;
    age: number;
    position: string;
}

export const defaultStateUser: User = {
    username: "",
    photo: "",
    followers: "",
    totalPost: 0,
    age: 0,
    position: ""
};

export const [useUser] = createStore(defaultStateUser);