// utils/data/reels.ts
export interface ReelType {
    id: string;
    uri: string;
    userName: string;
    description: string;
    likes: number;
    comments: number;
    isLiked: boolean;
}
// Backup options from other CDNs
export const BACKUP_REELS: ReelType[] = [
    {
        id: 'b1',
        uri: 'https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761',
        userName: 'urban_explorer',
        description: 'City exploration 🏙️',
        likes: 1000,
        isLiked: false,
        comments: 150,
    },
    {
        id: 'b2',
        uri: 'https://player.vimeo.com/external/371843572.sd.mp4?s=636da9a447d5b353b42e996fcdae7525d7a39b22&profile_id=164&oauth2_token_id=57447761',
        userName: 'aerial_views',
        description: 'Drone shots from above 🚁',
        likes: 2300,
        isLiked: false,
        comments: 150,
    },
    {
        id: 'b3',
        uri: 'https://player.vimeo.com/external/451837698.sd.mp4?s=0d7b53f8a6a2d2c2e3c4d5e6f7g8h9i0&profile_id=164&oauth2_token_id=57447761',
        userName: 'cooking_show',
        description: 'Quick recipe tutorial 🍳',
        likes: 3400,
        isLiked: false,
        comments: 150,
    },
    // Pexels videos (reliable)
    {
        id: 'p1',
        comments: 150,
        uri: 'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
        userName: 'coffee_addict',
        description: 'Morning coffee routine ☕',
        likes: 4500,
        isLiked: false,
    },
    {
        id: 'p2',
        comments: 150,
        uri: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4',
        userName: 'skate_life',
        description: 'Skboarding tricks 🛹',
        likes: 5600,
        isLiked: false,
    },
    {
        id: 'p3',
        comments: 150,
        uri: 'https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4',
        userName: 'gym_rat',
        description: 'Workout motivation 💪',
        likes: 6700,
        isLiked: false,
    },
];
export const REELS: ReelType[] = [
    // Original videos
    {
        id: '1',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        userName: 'nature_lover',
        description: 'Big Buck Bunny - Animated short film 🐰',
        likes: 1240,
        isLiked: false,
    },
    {
        id: '2',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        userName: 'tech_guru',
        description: 'Elephants Dream - Open source movie 🎬',
        likes: 856,
        isLiked: false,
    },
    {
        id: '3',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        userName: 'travel_diaries',
        description: 'For Bigger Blazes - Firefighting adventure 🔥',
        likes: 2341,
        isLiked: false,
    },
    {
        id: '4',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        userName: 'adventure_seeker',
        description: 'Epic escape scenes compilation 🏃‍♂️',
        likes: 1567,
        isLiked: false,
    },
    {
        id: '5',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        userName: 'funny_videos',
        description: 'When the fun gets bigger 😂',
        likes: 3422,
        isLiked: false,
    },
    {
        id: '6',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        userName: 'car_enthusiast',
        description: 'Joyride through the mountains 🚗',
        likes: 1890,
        isLiked: false,
    },
    {
        id: '7',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        userName: 'daily_vibes',
        description: 'Monday meltdown mood 😅',
        likes: 4532,
        isLiked: false,
    },
    {
        id: '8',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        userName: 'dragon_tales',
        description: 'Sintel - Epic fantasy adventure 🐉',
        likes: 2103,
        isLiked: false,
    },
    {
        id: '9',

        comments: 150, uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        userName: 'offroad_king',
        description: 'Subaru Outback - Street and dirt 🚙',
        likes: 987,
        isLiked: false,
    },
    {
        id: '10',
        comments: 150,
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        userName: 'sci_fi_fan',
        description: 'Tears of Steel - Sci-fi short 🚀',
        likes: 1765,
        isLiked: false,
    },
    {
        id: '11',
        comments: 150,
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Volcano.mp4',
        userName: 'earth_visuals',
        description: 'Volcano eruption in 4K 🌋',
        likes: 2890,
        isLiked: false,
    },
    {
        id: '12',
        comments: 150,
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        userName: 'supercar_club',
        description: 'Bullrun rally - Supercar madness 🏎️',
        likes: 4120,
        isLiked: false,
    },
    {
        id: '13',
        comments: 150,
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        userName: 'budget_rides',
        description: 'Best cars for $1000 💰',
        likes: 1543,
        isLiked: false,
    },
    // Additional vertical/portrait style videos
    {
        id: '14',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-39875-large.mp4',
        userName: 'fashion_daily',
        description: 'Silver makeup trend ✨',
        likes: 3201,
        isLiked: false,
    },
    {
        id: '15',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32808-large.mp4',
        userName: 'fitness_motivation',
        description: 'Morning run vibes 🏃‍♀️',
        likes: 2789,
        isLiked: false,
    },
    {
        id: '16',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-at-home-43913-large.mp4',
        userName: 'remote_work',
        description: 'Work from home life 💻',
        likes: 1234,
        isLiked: false,
    },
    {
        id: '17',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        userName: 'night_owl',
        description: 'Neon nights in the city 🌃',
        likes: 4567,
        isLiked: false,
    },
    {
        id: '18',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-under-neon-lights-1234-large.mp4',
        userName: 'dance_crew',
        description: 'Neon dance practice 💃',
        likes: 3890,
        isLiked: false,
    },
    {
        id: '19',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4',
        userName: 'city_lights',
        description: 'City traffic from above 🚁',
        likes: 2156,
        isLiked: false,
    },
    {
        id: '20',
        comments: 150,
        uri: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
        userName: 'ocean_vibes',
        description: 'Ocean waves ASMR 🌊',
        likes: 5678,
        isLiked: false,
    },
    ...BACKUP_REELS
];