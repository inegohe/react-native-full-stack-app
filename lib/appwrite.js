import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platfrom: 'com.sparkdesignlab.aora',
    projectId:'672cbae100084fcb6e82',
    databaseId: '672cbcf50027808f6821',
    userCollectionId: '672cbd4300205881ca7a',
    videoCollectionId: '672cbdaa003d3b5c8153',
    storageId: '672cbfce0031bb6167'
}

//init your react-native SDK
const client = new Client();

client
.setEndpoint(config.endpoint)
.setProject(config.projectId) //your Project Id
.setPlatform(config.platfrom);

const account = new Account( client );
const avatars = new Avatars( client );
const databases = new Databases( client );

export const createUser = async ( email, username, password ) => {

    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                acountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const signIn = async ( email, password ) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )

    return session;

    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}