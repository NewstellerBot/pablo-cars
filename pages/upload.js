import toast, { Toaster } from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import Authenticate from '../components/Authenticate'

function Label({ children }, props) {
  return (
    <label className="font-semibold text-lg text-black" {...props}>
      {children}
    </label>
  )
}

function Upload() {
  const [files, setFiles] = useState([])
  const [uuids, setUuids] = useState([])
  const { handleSubmit, register } = useForm()
  const router = useRouter()

  const { data: session } = useSession()
  const admin = session?.user?.role === 'admin'

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        let _uuids = []
        setFiles([...files, ...acceptedFiles])
        acceptedFiles.forEach(async (file) => {
          const uuid = uuidv4()
          _uuids.push(uuid)
          const res = await axios.get('/api/upload-image', {
            params: { file: uuid, type: file.type },
          })
          const { url } = res.data
          toast.promise(axios.put(url, file), {
            loading: 'Uploading...',
            success: 'Uploaded!',
            error: 'Error uploading',
          })
        })
        setUuids([...uuids, ..._uuids])
      } catch (err) {
        toast.error(`Error uploading file ${err.message}`)
      }
    },
    [files, uuids]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.png', '.jpeg', '.gif', '.heic', '.jpeg'],
    },
  })

  const onSubmit = async (data) => {
    const { year, price, mileage } = data
    const params = {
      ...data,
      year: parseInt(year),
      price: parseInt(price),
      mileage: parseInt(mileage),
      imgUrl: uuids,
    }

    await axios.post('/api/create-car', {
      params,
    })
    router.push('/')
  }
  if (admin)
    return (
      <>
        <main className="p-5 max-w-xl ml-auto mr-auto">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label>
              <p>Title</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                id="title"
                type="text"
                {...register('title', { required: true })}
              />
            </Label>
            <Label>
              <p>Maker</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                id="maker"
                type="text"
                {...register('maker', { required: true })}
              />
            </Label>
            <Label>
              <p>Price</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                type="number"
                id="price"
                {...register('price', { required: true, pattern: /^\d+$/ })}
              />
            </Label>
            <Label>
              <p>Production Year</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                type="number"
                id="year"
                {...register('year', { required: true, pattern: /^\d+$/ })}
              />
            </Label>
            <Label>
              <p>Mileage</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                type="number"
                id="mileage"
                {...register('mileage', { required: true, pattern: /^\d+$/ })}
              />
            </Label>
            <Label>
              <p>Drive</p>
              <input
                className="border border-gray-400 rounded w-full text-md font-normal p-1"
                type="text"
                id="drive"
                {...register('drive', { required: true })}
              />
            </Label>
            <Label>
              <p>Description</p>
              <textarea
                id="description"
                type="text"
                className="h-24 w-full border border-gray-400 rounded resize-none font-normal text-md p-1"
                {...register('description', { required: true })}
              />
            </Label>
            <Label>
              <p>Upload photos</p>
            </Label>
            <div
              {...getRootProps()}
              className="grid place-items-center rounded border border-dotted hover:border-solid border-gray-300 hover:border-blue-500 p-5 transition"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-sm font-normal">Drop the files here ...</p>
              ) : (
                <p className="text-sm font-normal">
                  Drag n drop some files here, or click to select files
                </p>
              )}
            </div>

            <h1 className="font-semibold text-lg">Uploaded files</h1>
            <div className="flex flex-col gap-2">
              {files.map((file, i) => {
                return (
                  <div key={uuids[i]} className="flex">
                    <p className="w-full">{file.name}</p>
                    <button
                      type="button"
                      className="grid place-items-center text-md p-2"
                      onClick={() => {
                        setUuids(uuids.filter((uuid) => uuid !== uuids[i]))
                        setFiles(files.filter((_file) => _file !== file))
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} width={15} height={15} />
                    </button>
                  </div>
                )
              })}
            </div>
            <button
              type="submit"
              className="block text-white bg-blue-500 p-3 font-semibold rounded w-full"
            >
              Upload
            </button>
          </form>
        </main>
        <Toaster />
      </>
    )
  else return <Authenticate />
}

export default Upload
