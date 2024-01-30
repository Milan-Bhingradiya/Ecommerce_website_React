import React, { useContext, useEffect } from 'react'
import Usercontext from '../../../../context/Usercontext'
import { useParams } from 'react-router-dom';

export default function Product_tags() {

  const { id } = useParams(); 
  const { fetchOneProduct ,oneProduct} = useContext(Usercontext)

  var product;
  useEffect(() => {
 
  }, [])

  return (
    <div id="product-tags-maindiv">
      <div id="product-tags-subdiv1">
        <div>
          Product's Tags
        </div>
      </div>

      <div id="product-tags-subdiv2">
        { oneProduct.tags &&oneProduct.tags.map((tagname) => {
          return <div key={tagname} className="product-tag"><div># {tagname}</div></div>
        })}

      </div>

      <div ></div>

    </div>
  )
}
