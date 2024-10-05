import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			default:
				'https://www.jumpfly.com/wp-content/uploads/2021/09/20210902-SEO-Blog-Post-about-Writing-an-SEO-Post-Jeff-B..png',
		},
		category: {
			type: String,
			default: 'uncategorized',
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		linkes: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post
