import { info } from 'console';
import mongoose from "mongoose"

export interface IUserLogin {
    email: string
    password: string
}
export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    username: string
    access_code: string
}

export interface ILoginReducerAction {
    type: "email" | "password";
    payload: string
}

export interface IRegistereducerAction {
    type: "email" | "password" | "confirm_password" | "username" | "access_code";
    payload: string
}

export interface IProductTest {
    parameter: string;
    method: string;
    result: string;
}

export interface IProduct {
    _id?: mongoose.ObjectId | null;
    image: string;
    name: string;
    description: string;
    performantFeature: string;
    testResults: Array<IProductTest>;
    testResultsImage: string;
    storage: string;
    sizes: Array<number>;
}

export interface IFeedback {
    _id?: mongoose.ObjectId | null;
    productId: mongoose.ObjectId | null;
    name: string;
    email: string;
    number: string;
    info: string;
    type: string;
}

export interface INews {
    title: string;
    snippet: string;
    content: string;
    image: string;
}

export interface IAvailableScholarship {
    name: string;
    start: string;
    end: string;
    category: string;
    requirements: string;
}

export interface IAdvisory {
    name: string;
    email: string;
    number: string;
    title: string;
    image: string;
    description: string;
}

export interface IFaqs {
    question: string;
    answer: string;
}

export interface IAboutUs {
    _id?: mongoose.ObjectId | null;
    first_section: {
        image: string,
        text: string,
      },
    second_section: {
        image: string,
        text: string,
    }
    third_section: string
}

export interface ICms {
    _id?: mongoose.ObjectId | null;
    hero: {
        image: Array<string>,
        header: string,
        text: string,
    },
    whatWeDo: {
        text: string,
        image: string,
    },
    whoWeAre: {
        text: string,
        image: string,
    }
}

export interface IAmbassador {
    name: string;
    email: string;
    number: string;
    title: string;
    image: string;
    description: string;
}

export interface ITableColumn {
    name: string;
    label: string;
    extra?: boolean;
    custom?: (value: string, meta: any) => JSX.Element;
    options?: {
        filter: boolean;
        sort: boolean;
    };
}

export interface IWinner {
    name: string;
    email: string;
    position: string;
    image: string;
    category: string;
}
export interface IReducerAction<T> {
    type: T | string;
    payload?: string | { [key: string]: string } | IProductTest;
    data?: string | { [key: string]: string };
    name?: string;
}

