// Community Sharing Platform API
import { supabase } from './supabase'

export class CommunityAPI {
  constructor() {
    this.postsTable = 'community_posts'
    this.commentsTable = 'community_comments'
    this.votesTable = 'community_votes'
  }

  /**
   * Create a new community post
   */
  async createPost(postData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from(this.postsTable)
        .insert([{
          user_id: user.id,
          title: postData.title,
          content: postData.content,
          type: postData.type, // 'project', 'technique', 'practice', 'idea'
          tags: postData.tags || [],
          media_urls: postData.mediaUrls || [],
          location: postData.location || null,
          coordinates: postData.coordinates || null,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      return { success: true, post: data }
    } catch (error) {
      console.error('Error creating post:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get community posts with filters
   */
  async getPosts(filters = {}) {
    try {
      let query = supabase
        .from(this.postsTable)
        .select(`
          *,
          user:user_id (id, email),
          votes:community_votes(vote_type),
          comments:community_comments(count)
        `)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.type) {
        query = query.eq('type', filters.type)
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags)
      }

      if (filters.location) {
        query = query.eq('location', filters.location)
      }

      const { data, error } = await query

      if (error) throw error

      // Calculate vote counts
      const postsWithVotes = data.map(post => ({
        ...post,
        upvotes: post.votes?.filter(v => v.vote_type === 'upvote').length || 0,
        downvotes: post.votes?.filter(v => v.vote_type === 'downvote').length || 0,
        commentCount: post.comments?.length || 0
      }))

      return { success: true, posts: postsWithVotes }
    } catch (error) {
      console.error('Error fetching posts:', error)
      return { success: false, error: error.message, posts: [] }
    }
  }

  /**
   * Get mock posts (for demo without database)
   */
  getMockPosts() {
    return {
      success: true,
      posts: [
        {
          id: 1,
          title: 'Successful Agroforestry Project in Meru',
          content: 'We integrated trees with crops and saw a 40% increase in soil moisture retention. Using Grevillea and Leucaena trees alongside maize has transformed our farm.',
          type: 'project',
          tags: ['agroforestry', 'soilrestoration', 'meru'],
          media_urls: [],
          location: 'Meru County',
          coordinates: { lat: 0.05, lng: 37.65 },
          upvotes: 45,
          downvotes: 2,
          commentCount: 12,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'farmer@meru.ke' }
        },
        {
          id: 2,
          title: 'Composting Technique That Doubled Our Yield',
          content: 'Started using layered composting with kitchen waste, farm residues, and manure. After 3 months, our soil organic matter increased from 2% to 4.5%. Sharing our process!',
          type: 'technique',
          tags: ['composting', 'organicfarming', 'soilrestoration'],
          media_urls: [],
          location: 'Kiambu County',
          coordinates: { lat: -1.17, lng: 36.83 },
          upvotes: 67,
          downvotes: 1,
          commentCount: 23,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'organic.farmer@kiambu.ke' }
        },
        {
          id: 3,
          title: 'Drip Irrigation System Saves 70% Water',
          content: 'Installed simple drip irrigation using recycled bottles. Cut water usage by 70% and crops are healthier. Perfect for water-scarce areas. Happy to share setup details!',
          type: 'practice',
          tags: ['irrigation', 'waterconservation', 'climatesmart'],
          media_urls: [],
          location: 'Machakos County',
          coordinates: { lat: -1.52, lng: 37.26 },
          upvotes: 89,
          downvotes: 3,
          commentCount: 34,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'innovator@machakos.ke' }
        },
        {
          id: 4,
          title: 'Cover Cropping Restored Our Eroded Land',
          content: 'After 2 years of severe erosion, we planted cowpeas and lablab as cover crops. Soil loss reduced by 80%, and we got bonus protein crops!',
          type: 'project',
          tags: ['covercrops', 'erosioncontrol', 'soilrestoration'],
          media_urls: [],
          location: 'Embu County',
          coordinates: { lat: -0.53, lng: 37.45 },
          upvotes: 56,
          downvotes: 0,
          commentCount: 18,
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'conservationist@embu.ke' }
        },
        {
          id: 5,
          title: 'Biochar Production from Farm Waste',
          content: 'Converting crop residues to biochar instead of burning. Biochar improves soil structure, retains nutrients, and sequesters carbon. Game changer!',
          type: 'technique',
          tags: ['biochar', 'carbonsequestration', 'soilrestoration'],
          media_urls: [],
          location: 'Nakuru County',
          coordinates: { lat: -0.30, lng: 36.08 },
          upvotes: 42,
          downvotes: 2,
          commentCount: 15,
          created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'biochar.expert@nakuru.ke' }
        },
        {
          id: 6,
          title: 'Rainwater Harvesting for Dry Season',
          content: 'Built simple rock catchments and underground tanks. Collected enough water to irrigate 2 acres through the dry season. No more crop failures!',
          type: 'idea',
          tags: ['waterharvesting', 'climateadaptation', 'irrigation'],
          media_urls: [],
          location: 'Makueni County',
          coordinates: { lat: -1.81, lng: 37.62 },
          upvotes: 73,
          downvotes: 1,
          commentCount: 27,
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          user: { email: 'water.champion@makueni.ke' }
        }
      ]
    }
  }

  /**
   * Vote on a post
   */
  async votePost(postId, voteType) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from(this.votesTable)
        .select()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

      if (existingVote) {
        // Update existing vote
        const { error } = await supabase
          .from(this.votesTable)
          .update({ vote_type: voteType })
          .eq('id', existingVote.id)

        if (error) throw error
      } else {
        // Create new vote
        const { error } = await supabase
          .from(this.votesTable)
          .insert([{
            post_id: postId,
            user_id: user.id,
            vote_type: voteType
          }])

        if (error) throw error
      }

      return { success: true }
    } catch (error) {
      console.error('Error voting:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Add comment to post
   */
  async addComment(postId, commentText) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from(this.commentsTable)
        .insert([{
          post_id: postId,
          user_id: user.id,
          content: commentText,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      return { success: true, comment: data }
    } catch (error) {
      console.error('Error adding comment:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get comments for a post
   */
  async getComments(postId) {
    try {
      const { data, error } = await supabase
        .from(this.commentsTable)
        .select(`
          *,
          user:user_id (id, email)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { success: true, comments: data }
    } catch (error) {
      console.error('Error fetching comments:', error)
      return { success: false, error: error.message, comments: [] }
    }
  }

  /**
   * Get popular tags
   */
  getPopularTags() {
    return [
      { name: 'agroforestry', count: 45 },
      { name: 'soilrestoration', count: 67 },
      { name: 'organicfarming', count: 52 },
      { name: 'irrigation', count: 38 },
      { name: 'composting', count: 41 },
      { name: 'covercrops', count: 29 },
      { name: 'climatesmart', count: 56 },
      { name: 'waterconservation', count: 44 },
      { name: 'erosioncontrol', count: 33 },
      { name: 'biochar', count: 24 }
    ]
  }
}
