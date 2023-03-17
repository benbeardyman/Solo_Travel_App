
import { useEffect, useState } from "react"
import { getUserProfile } from "../services/UserService"
import { Image, FlatList, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import {
    updateUserProfileName,
    updateUserProfileHomeTown,
    updateUserProfileNationality,
    updateUserProfileAge,
    updateUserProfileAvatarUrl,
    updateUserProfileLocation,
    getUserProfile
} from "../services/UserService";


const backupImage = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';

const Profile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserProfile(3)
        .then(data => {
            console.log(data);
            setUser(data);
        })
        .catch(error => console.log(error))
    }, []);

    const [profile, setProfile] = useState([]);
    const [newName, setNewName] = useState("")
    const [newHomeTown, setNewHomeTown] = useState("")
    const [newNationality, setNewNationality] = useState("")
    const [newAge, setNewAge] = useState("")
    const [newPhoto, setNewPhoto] = useState("")
    const [newLocation, setNewLocation] = useState("");
    const [editingName, setEditingName] = useState("")
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingHomeTown, setIsEditingHomeTown] = useState(false);
    const [editingNationality, setEditingNationality] = useState(false);
    const [editingAge, setEditingAge] = useState(false);
    const [editingLocation, setEditingLocation] = useState(false);
    const [isSavingHomeTown, setIsSavingHomeTown] = useState(false);

    useEffect(() => {
        getUserProfile("4").then((json) => {
            setProfile(json);
        });
    }, []);

    const handleUpdateName = async () => {
        const res = await updateUserProfileName(profile.id, newName);
        if (res) {
            setProfile({ ...profile, displayName: newName });
            setNewName("");
            setIsEditingName(false);
        }
    };

    const handleUpdateHomeTown = async () => {
        const res = await updateUserProfileHomeTown(profile.id, newHomeTown);
        if (res) {
            setProfile({ ...profile, homeTown: newHomeTown });
            setNewHomeTown("");
            setIsEditingHomeTown(false)
        }
    };

    const handleUpdateNationality = async () => {
        const res = await updateUserProfileNationality(
            profile.id,
            newNationality
        );
        if (res) {
            setProfile({ ...profile, nationality: newNationality });
            setNewNationality("");
        }
    };

    const handleUpdateAge = async () => {
        const res = await updateUserProfileAge(profile.id, newAge)
        if (res) {
            setProfile({ ...profile, age: newAge })
            setNewAge("")
        }
    }

    const handleUpdateUserPhoto = async () => {
        const res = await updateUserProfileAvatarUrl(profile.id, newPhoto)
        if (res) {
            setProfile({ ...profile, avatarUrl: newPhoto })
            setNewPhoto("")
        }
    }

    const handleUpdateLocation = async () => {
        const res = await updateUserProfileLocation(profile.id, { name: newLocation, country: profile.location.country })
        if (res) {
            setProfile({ ...profile, location: { name: newLocation, country: profile.location.country } })
            setNewLocation("")
        }
    }

    return (
    //NEW
    <View style={styles.userContainer}>
            <Image
            source={{ uri: user?.avatarUrl?user.avatarUrl: backupImage}}
            style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}}
            />
            <Text style={styles.userProfileName}>User profile name: {user?.displayName?user.displayName: ""}</Text>
            <Text style={styles.userProfileAge}>Age: {user?.age?user.age: ""}</Text>
            <Text style={styles.userProfileHometown}>Hometown: {user?.homeTown?user.homeTown: ""}</Text>
            <Text style={styles.userProfileNationality}>Nationality: {user?.nationality?user.nationality: ""}</Text>
            <Text style={styles.userProfileLocation}>Location: {user?.location?user.location.name: ""}</Text>
            
        </View>
        
        //END
    
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <View style={styles.row}>
            </View>
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.row}>
                    {editingName ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newName}
                                onChangeText={(text) => setNewName(text)}
                            />
                            <Button
                                title="Save"
                                onPress={handleUpdateName}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>{profile.displayName}</Text>
                            <Button
                                title="Edit"
                                onPress={() => setIsEditingName(true)}
                                style={styles.button}
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Home town:</Text>
                <View style={styles.row}>
                    {isEditingHomeTown ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newHomeTown}
                                onChangeText={(text) => setNewHomeTown(text)}
                            />
                            <Button
                                title="Save"
                                onPress={handleUpdateHomeTown}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.text}>{profile.homeTown}</Text>
                            <Button
                                title="Edit"
                                onPress={() => setIsEditingHomeTown(true)}
                                style={styles.button}
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Nationality:</Text>
                <View style={styles.row}>
                    {editingNationality ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newNationality}
                                onChangeText={(text) => setNewNationality(text)}
                            />
                            <Button
                                title="Save"
                                onPress={handleUpdateNationality}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.text}>{profile.nationality}</Text>
                            <Button
                                title="Edit"
                                onPress={() => setEditingNationality(true)}
                                style={styles.button}
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Age:</Text>
                <View style={styles.row}>
                    {editingAge ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newAge}
                                onChangeText={(text) => setNewAge(text)}
                            />
                            <Button
                                title="Save"
                                onPress={handleUpdateAge}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.text}>{profile.age}</Text>
                            <Button
                                title="Edit"
                                onPress={() => setEditingAge(true)}
                                style={styles.button}
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.label}>Location:</Text>
                <View style={styles.row}>
                    {editingLocation ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newLocation}
                                onChangeText={(text) => setNewLocation(text)}
                            />
                            <Button
                                title="Save"
                                onPress={handleUpdateLocation}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <>
                            {profile.location && profile.location.name ? (
                                <Text style={{ marginRight: 10 }}>
                                    {profile.location.name}, {profile.location.country.name}
                                </Text>
                            ) : (
                                <Text style={{ marginRight: 10 }}>N/A</Text>
                            )}
                            <Button
                                title="Edit"
                                onPress={() => setEditingLocation(true)}
                                style={styles.button}
                            />
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F2',
        marginTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileInfo: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        height: 40,
    },
    updateButton: {
        backgroundColor: '#FF9900',
        color: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    userProfileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userProfileAge: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    userProfileHometown: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userProfileNationality: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userProfileLocation: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Profile