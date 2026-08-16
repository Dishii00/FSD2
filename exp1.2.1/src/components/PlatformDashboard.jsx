import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlatforms, togglePlatformThunk } from '../store/slices/platformsSlice';
import { selectAllPosts } from '../store/slices/postsSlice';
import { setPlatformFilter } from '../store/slices/uiSlice';
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  BookOpen, 
  Youtube, 
  Share2, 
  CheckCircle2, 
  XCircle,
  Radio
} from 'lucide-react';

const ICON_MAP = {
  Twitter: Twitter,
  Linkedin: Linkedin,
  Instagram: Instagram,
  BookOpen: BookOpen,
  Youtube: Youtube,
};

export default function PlatformDashboard() {
  const dispatch = useDispatch();
  const platforms = useSelector(selectAllPlatforms);
  const posts = useSelector(selectAllPosts);
  const selectedPlatformFilter = useSelector((state) => state.ui.selectedPlatformFilter);

  // Calculate platform post counts dynamically from normalized posts
  const getPostCountForPlatform = (platformId) => {
    return posts.filter((post) => post.targetPlatforms && post.targetPlatforms.includes(platformId)).length;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Share2 size={18} color="var(--primary)" /> Connected Social Platforms
        </h2>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          Redux State Normalized Slices • Click card to filter
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
        
        {/* All Platforms Filter Card */}
        <div
          className="glass-panel glass-panel-hover"
          onClick={() => dispatch(setPlatformFilter('all'))}
          style={{
            padding: '1rem',
            cursor: 'pointer',
            borderColor: selectedPlatformFilter === 'all' ? 'var(--primary)' : 'var(--border-color)',
            background: selectedPlatformFilter === 'all' ? 'var(--primary-light)' : undefined,
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
            <Radio size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>All Platforms</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{posts.length} Total Posts</div>
          </div>
        </div>

        {/* Platform Specific Cards */}
        {platforms.map((platform) => {
          const IconComp = ICON_MAP[platform.icon] || Share2;
          const postCount = getPostCountForPlatform(platform.id);
          const isSelected = selectedPlatformFilter === platform.id;

          return (
            <div
              key={platform.id}
              className="glass-panel glass-panel-hover"
              onClick={() => dispatch(setPlatformFilter(platform.id))}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                background: isSelected ? 'var(--primary-light)' : undefined,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    background: `${platform.color}20`,
                    color: platform.color
                  }}>
                    <IconComp size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700' }}>{platform.name}</h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Limit: {platform.charLimit} chars
                    </span>
                  </div>
                </div>

                {/* Connection Toggle */}
                <button
                  className="btn btn-secondary btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(togglePlatformThunk(platform.id));
                  }}
                  title={platform.connected ? 'Disconnect platform' : 'Connect platform'}
                  style={{ border: 'none', background: 'transparent' }}
                >
                  {platform.connected ? (
                    <CheckCircle2 size={18} color="var(--accent-emerald)" />
                  ) : (
                    <XCircle size={18} color="var(--text-muted)" />
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: platform.connected ? 'var(--accent-emerald)' : 'var(--text-muted)', fontWeight: '600' }}>
                  ● {platform.connected ? 'Active Sync' : 'Disabled'}
                </span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                  {postCount} Posts
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
