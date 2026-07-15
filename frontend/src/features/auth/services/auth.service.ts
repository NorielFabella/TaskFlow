import type {
    LoginData,
    RegisterData,
    StoredUser,
    User,
} from "../../../types/auth";

const USERS_KEY = "taskflow-users";
const SESSION_KEY = "taskflow-session";

function getUsers(): StoredUser[] {

    const stored = localStorage.getItem(USERS_KEY);

    if (!stored) {
        return [];
    }

    return JSON.parse(stored);

}

function saveUsers(users: StoredUser[]) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}

export async function register(
    data: RegisterData
): Promise<User> {

    const users = getUsers();

    const emailExists = users.some(
        (user) => user.email === data.email
    );

    if (emailExists) {
        throw new Error("Email already exists.");
    }

    const storedUser: StoredUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        password: data.password,
    };

    users.push(storedUser);

    saveUsers(users);

    const { password, ...user } = storedUser;

    return user;

}

export async function login(
    data: LoginData
): Promise<User> {

    const users = getUsers();

    const storedUser = users.find(
        (user) => user.email === data.email
    );

    if (!storedUser) {
        throw new Error("Invalid email or password.");
    }

    if (storedUser.password !== data.password) {
        throw new Error("Invalid email or password.");
    }

    const { password, ...user } = storedUser;

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(user)
    );

    return user;

}

export async function logout(): Promise<void> {

    localStorage.removeItem(SESSION_KEY);

}

export function getCurrentUser(): User | null {

    const stored = localStorage.getItem(
        SESSION_KEY
    );

    if (!stored) {
        return null;
    }

    return JSON.parse(stored);

}