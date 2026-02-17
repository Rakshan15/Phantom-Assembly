
import React from 'react';
import { BLOG_POSTS } from '../constants';
import SectionTitle from './SectionTitle';
import Button from './Button';

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 md:py-28 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Insights & Blog"
          subtitle="Stay informed with our latest articles on cloud, DevOps, and engineering."
          id="blog"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 animate-zoomIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-4 text-sm">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-indigo-700 text-indigo-100 text-xs px-3 py-1 rounded-full opacity-90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400 mt-auto pt-4 border-t border-gray-700">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
                {/* <Button variant="outline" className="mt-4 w-full">Read More</Button> */}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="primary">View All Posts</Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;