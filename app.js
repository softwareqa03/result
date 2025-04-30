// app.js
import { db } from './firebase-config.js';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const tableBody = document.getElementById("student-table");
const form = document.getElementById("student-form");
const searchInput = document.getElementById("search");
let editingId = null;

export async function loadStudents(filter = '') {
  tableBody.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "students"));

  querySnapshot.forEach((docSnap) => {
    const student = docSnap.data();
    if (filter && !student.name.includes(filter)) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${docSnap.id}</td>
      <td>${student.name}</td>
      <td>${student.standard}</td>
      <td>${student.phone}</td>
      <td>${student.createdAt?.toDate().toLocaleString() || '-'}</td>
      <td>
        <button class="btn edit" onclick="editStudent('${docSnap.id}', '${student.name}', '${student.standard}', '${student.phone}')">Edit</button>
        <button class="btn delete" onclick="deleteStudent('${docSnap.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

window.deleteStudent = async function (id) {
  await deleteDoc(doc(db, 'students', id));
  loadStudents();
};

window.editStudent = function (id, name, standard, phone) {
  document.getElementById('name').value = name;
  document.getElementById('standard').value = standard;
  document.getElementById('phone').value = phone;
  editingId = id;
};

form.onsubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const standard = document.getElementById('standard').value;
  const phone = document.getElementById('phone').value;

  if (editingId) {
    await updateDoc(doc(db, 'students', editingId), { name, standard, phone });
    editingId = null;
  } else {
    await addDoc(collection(db, 'students'), {
      name, standard, phone, createdAt: serverTimestamp()
    });
  }

  form.reset();
  loadStudents();
};

searchInput?.addEventListener('input', e => loadStudents(e.target.value));


// Function to fetch blog posts from the backend
async function fetchBlogPosts() {
  try {
    const response = await fetch('/api/blog-posts');
    const blogPosts = await response.json();
    renderBlogPosts(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

// Function to render blog posts on the page
function renderBlogPosts(blogPosts) {
  const blogContainer = document.querySelector('.blog-container');
  blogContainer.innerHTML = '';
  blogPosts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'bg-white rounded-lg shadow-md p-4';
    article.innerHTML = `
      <h2 class="text-xl font-semibold">${post.title}</h2>
      <p>${post.content}</p>
    `;
    blogContainer.appendChild(article);
  });
}

// Call fetchBlogPosts on page load
window.addEventListener('DOMContentLoaded', fetchBlogPosts);
