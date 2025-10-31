import {useState,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
const Api_BASE_url="https://my-blog-app-backend-yjy9.onrender.com";
const Api_url=`${Api_BASE_url}/api/posts`;
export default function Blogmodule(){
const [title,settitle]=useState("");
const [name,setname]=useState("");
const [content,setcontent]=useState("");
const[editingpostid,seteditingpostid]=useState(null);
const navigate=useNavigate();
const token=localStorage.getItem("token");
const fileInputRef=useRef(null);
const [image,setImage]=useState(null);

useEffect(()=>{
  if(!token){
    navigate("/Auth");
  }
},[token,navigate])

const [posts,setposts]=useState([]);
const fetchposts=async()=>{
  try{
const response=await fetch(Api_url);
const data=await response.json();
setposts(data);
  }
  catch(error){
console.error(error)
  }
}
useEffect(() => {
     fetchposts();
   }, []);
   const handlesubmit=async(event)=>{
    event.preventDefault();
    // const postdata={title,name,content};
    const formData=new FormData();
    formData.append("title",title)
    formData.append("name",name)
    formData.append("content",content)
    if(image){
      formData.append("image",image);
    }


    const url=editingpostid ? `${Api_url}/${editingpostid}`:Api_url;
    const method=editingpostid?"PUT":"POST";
    try{
const response=await fetch(url,{
method:method,
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify(postdata)
body:formData
})
if(response.ok){
  settitle("");
  setcontent("");
  setname("");
  seteditingpostid(null);
  if(fileInputRef.current){
    fileInputRef.current.value=""
  }
  fetchposts();
}
    }catch(error){
console.error(error);
    }
   }

   const handleDelete=async(postId)=>{
    const response=await fetch(`${Api_url}/${postId}`,{method:"DELETE"});
    if(response.ok){
await fetchposts();
    }
   }
   const handleEdit=async(post)=>{
    seteditingpostid(post._id);
    settitle(post.title);
    setname(post.name);
    setcontent(post.content);
   }
   const handlelogout=()=>{
    localStorage.removeItem("token");
    navigate("/Auth");
   }

return(
<div className="app-container">
  <button 
  onClick={handlelogout} 
  style={{
    float: "right",
    padding: "10px 18px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
  }}
>
  Logout
</button>

  <div className="form-section">
    <h2>Create a new post</h2>
     <form onSubmit={handlesubmit}>
      <input type="text" placeholder="name of Author" value={name} onChange={(e)=>setname(e.target.value)}></input>
       <input type="text" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)}></input>
        <textarea placeholder="the content is..." value={content} onChange={(e)=>setcontent(e.target.value)}></textarea>
        <label>upload image</label>
        <input type="file"
        ref={fileInputRef}
        onChange={(e)=>setImage(e.target.files[0])}
        accept="image/*"/>
     <button type="submit">{editingpostid? "updatepost":"create post"}</button>
     </form>
  </div>
  <div className="post-section">
    <h2>Latest posts</h2>
    {posts.map((post)=>(
      <div key={post._id} className="post-card">
        <h3>{post.title}</h3>
        <p className="post-author">by {post.name}</p>
        {post ?.imageurl&&(
          <img src={post.imageurl}
          alt={post.title}
          className="post-image"/>
        )}
        <p>{post.content}</p>
        <div className="post-actions">
<button onClick={()=>handleEdit(post)}>edit</button>
<button onClick={()=>handleDelete(post._id)}>delete</button>
        </div>
      </div>
    ))}
  </div>
</div>
);
}
