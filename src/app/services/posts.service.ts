import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs:AngularFirestore) { }
  loadFeatured(){
    return this.afs.collection('posts', ref => ref.where('isFeatured','==',true).limit(4)).snapshotChanges().pipe(
     map(actions =>{
       return actions.map(a =>{
         const data= a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id , data};
       })
     })
   )
 }
 loadLatest(){
  return this.afs.collection('posts', ref => ref.orderBy('createdAt').limit(6)).snapshotChanges().pipe(
   map(actions =>{
     return actions.map(a =>{
       const data= a.payload.doc.data();
       const id = a.payload.doc.id;
       return {id , data};
      })
    })
   )
  }
  loadCategory(categoryId){
    return this.afs.collection('posts', ref => ref.where('category.categoryId','==',categoryId)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data= a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , data};
        })
      })
    )
  }
  loadSinglePost(postId){
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }
  loadSimiliar(catId){
    return this.afs.collection('posts', ref => ref.where('category.categoryId','==',catId).limit(4)).snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data= a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id , data};
        })
      })
    )
  }
}
