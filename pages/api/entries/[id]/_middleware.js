import { NextResponse } from 'next/server'

export const middleware = (req, e) =>{
  
  const id = req.page.params?.id || ''

  const checkMongoIdRegExp = new RegExp("^[0-9a-fA-F]{24}$")

  if(!checkMongoIdRegExp.test(id)){
    return new Response(JSON.stringify({ message : 'El id no es valido' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}
