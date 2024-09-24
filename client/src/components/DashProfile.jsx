import { useSelector } from 'react-redux'
import { TextInput, Button, Alert } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function DashProfile() {
	const { currentUser } = useSelector(state => state.user)
	const [imageFileUrl, setImageFileUrl] = useState(null)
	const [imageFile, setImageFile] = useState(null)
	const [username, setUsername] = useState('')
	const [imageFileUploadingProgress, setImageFileUploadingProgress] =
		useState(0)
	const [imageFileUploadError, setImageFileUploadError] = useState(null)

	const filePickerRef = useRef(null)
	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file) {
			setImageFile(file)
			setImageFileUrl(URL.createObjectURL(file))
		}
	}
	useEffect(() => {
		if (imageFile) {
			uploadImage()
		}
	}, [imageFile])

	const uploadImage = async () => {
		//service firebase.storage {
		//   match /b/{bucket}/o {
		//     match /{allPaths=**} {
		//       allow read;
		//       allow write: if
		//       request.resource.size < 2 * 1024 * 1024 &&
		//       request.resource.contentType.matches("image/.*")
		//     }
		//   }
		// }
		setImageFileUploadError(null)
		const storage = getStorage(app)
		const fileName = new Date().getTime() + imageFile.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, imageFile)

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setImageFileUploadingProgress(progress.toFixed(0))
			},
			error => {
				setImageFileUploadError(
					'Could not upload image (File must  be less than 2MB)'
				)
				setImageFileUploadingProgress(null)
				setImageFile(null)
				setImageFileUrl(null)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(dowlnloadURL => {
					setImageFileUrl(dowlnloadURL)
				})
			}
		)
	}

	return (
		<div className='max-w-lg mx-auto p-3 w-full'>
			<h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
			<form className='flex flex-col gap-4'>
				<input
					type='file'
					accept='image/*'
					onChange={handleImageChange}
					ref={filePickerRef}
					hidden
				/>
				<div
					className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
					onClick={() => filePickerRef.current.click()}
				>
					<img
						src={imageFileUrl || currentUser.profilePicture}
						alt='user'
						className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
							imageFileUploadingProgress &&
							imageFileUploadingProgress < 100 &&
							'opacity-60'
						}`}
					/>
					{imageFileUploadingProgress && (
						<CircularProgressbar
							value={imageFileUploadingProgress || 0}
							text={`${imageFileUploadingProgress}%`}
							strokeWidth={5}
							styles={{
								root: {
									width: '100%',
									height: '100%',
									position: 'absolute',
									top: '0',
									left: '0',
								},
								path: {
									stroke: `rgba(62, 152, 199, ${
										imageFileUploadingProgress / 100
									})`,
								},
							}}
						/>
					)}
				</div>
				{imageFileUploadError && (
					<Alert color='failure'>{imageFileUploadError}</Alert>
				)}

				<TextInput
					type='text'
					id='username'
					placeholder='username'
					defaultValue={`@${currentUser.username}`}
				/>
				<TextInput
					type='email'
					id='email'
					placeholder='email'
					defaultValue={currentUser.email}
				/>
				<TextInput type='password' id='password' placeholder='password' />
				<Button type='submit' gradientDuoTone='purpleToBlue' outline>
					Update
				</Button>
				<div className='text-red-500 flex justify-between mt-5'>
					<span className='cursor-pointer'>Delete account</span>
					<span className='cursor-pointer'>Sign Out</span>
				</div>
			</form>
		</div>
	)
}
