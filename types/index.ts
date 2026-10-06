// /types/index.ts
// Central re-export for all data-domain TypeScript interfaces.
// Each interface mirrors its corresponding /data/*.json file exactly.
// Do not remove required fields — component contracts depend on this shape.

export type { SiteConfig } from './site';
export type { NavItem } from './navigation';
export type { RoomOption } from './rooms';
export type { CuisineCategory, DishItem } from './dining';
export type { GalleryTab, GalleryCategory, GalleryImage } from './gallery';
export type { Testimonial } from './testimonials';
export type { ChatbotConfig, ChatRule } from './chatbot';

