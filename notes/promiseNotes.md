## 📘 **Module: Understanding Promises in Firebase (with `softDeleteAllNotes`)**

---

### ✅ First: What are Promises?

A **Promise** is JavaScript's way of saying:

> "This code is doing something that takes time (like asking Firebase for data). Once it’s done, I’ll call `.then()` with the result — or `.catch()` if it fails."

---

### 🧠 Think of a Promise like this:

> 🧋 “Order a bubble tea. When it's ready, `.then()` drink it. If something goes wrong, `.catch()` complain.”

```js
orderBubbleTea()
  .then(function (drink) {
    console.log("Drink received:", drink);
  })
  .catch(function (error) {
    console.error("No tea today:", error);
  });
```

---

## 🔄 Back to the Code

### 🚩 Goal: Soft-delete *all notes* for the current user.

To do this:
1. Get the current user (takes time)
2. Fetch all their notes (takes time)
3. Loop over those notes and update each one to `{ deleted: true }` (each update also takes time)
4. Wait for *all updates* to finish

---

## 🧩 Why Nest `.then()` Calls?

Each `.then()` waits for the previous step to finish — it’s a *chain of promises*:

```js
getAuthenticatedUser().then(function (user) {
  return getDocs(...).then(function (snapshot) {
    // Do something with docs
    return Promise.all([...]);
  });
});
```

Think of it like this:
> "First get the user → then get their notes → then soft delete them all."

Each step returns a **new promise**, which is why we nest `return` inside `.then()` — we’re passing the result along.

---

## 🧵 Why Use `Promise.all()`?

When you soft-delete each note with `updateDoc(...)`, you're starting **a bunch of delete requests at once** — but they're *asynchronous* (they don’t finish instantly).

`Promise.all([...])` waits for **all of them** to finish.

### 🎨 Visual:

```js
[
  updateDoc(note1),
  updateDoc(note2),
  updateDoc(note3)
]
```

Each of those returns a promise. `Promise.all()` takes them and says:

> "I'll wait until ALL of these promises are done."

So this:

```js
return Promise.all(updatePromises);
```

Means:
> “Only consider `softDeleteAllNotes()` successful if **all** deletions succeeded.”

---

## 💡 Analogy

```js
Promise.all([task1(), task2(), task3()]);
```

is like saying:

> "Bake 3 pizzas. When ALL are done, serve dinner. If ANY fail, cancel dinner."

---

## 🧪 Summary of the Code

```js
export function softDeleteAllNotes() {
  return getAuthenticatedUser()  // Step 1: Get user
    .then(function (user) {
      var notesRef = collection(firestore, "users", user.uid, "notes");

      return getDocs(notesRef)    // Step 2: Get all notes
        .then(function (snapshot) {
          var updatePromises = [];

          snapshot.forEach(function (docSnap) {
            var updatePromise = updateDoc(docSnap.ref, {
              deleted: true,
              deletedAt: new Date()
            });
            updatePromises.push(updatePromise); // Step 3: Queue all updates
          });

          return Promise.all(updatePromises); // Step 4: Wait for all to finish
        });
    });
}
```

---

## ✅ How to Use It

```js
softDeleteAllNotes()
  .then(function () {
    console.log("Success! All notes are soft deleted.");
  })
  .catch(function (error) {
    console.error("Something failed:", error);
  });
```

---
