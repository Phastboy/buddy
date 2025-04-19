import { EventCard, PostCard } from '@/components/cards';
import { ThemedScrollView } from '@/components/Themed';
import {
  getEnhancedPosts,
  getEnhancedEvents,
  findUser,
  findPost,
} from '@/utils/data';

export default function HomeScreen() {
  const posts = getEnhancedPosts();
  const events = getEnhancedEvents();

  return (
    <ThemedScrollView>
      {/* Render events */}
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          occurrence={event.occurrences?.[0]}
          user={
            event.userId
              ? (userId) => {
                  const user = findUser(userId);
                  if (!user)
                    throw new Error(`User not found for ID: ${userId}`);
                  return user;
                }
              : undefined
          }
          rsvpCount={event.rsvps?.length}
        />
      ))}

      {/* Render posts */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={
            post.userId
              ? (userId) => {
                  const user = findUser(userId);
                  if (!user)
                    throw new Error(`User not found for ID: ${userId}`);
                  return user;
                }
              : undefined
          }
          likeCount={post.likes?.length}
          commentCount={post.comments?.length}
        />
      ))}
    </ThemedScrollView>
  );
}
