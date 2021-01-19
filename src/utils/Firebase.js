import firebase from 'firebase';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBw4JkBU4VU5oCuMr-_rafoqts-R8ojtv8",
    authDomain: "activitylist-53295.firebaseapp.com",
    projectId: "activitylist-53295",
    storageBucket: "activitylist-53295.appspot.com",
    messagingSenderId: "769084690296",
    appId: "1:769084690296:web:2d3d5631c16f75ca63428d"
};

class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null, user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                     .catch(error => {
                         callback(error);
                     })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name')
        
        this.unsubscribe = ref.onSnapshot(snapshoot => {
            listData = [];

            snapshoot.forEach(doc => {
                listData.push({ id: doc.id, ...doc.data()})
            });

            callback(listData);
        })

    }

    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('listData')
    }

    detach() {
        this.unsubscribe();
    }
}


export default Fire;