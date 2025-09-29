export interface AttendanceRecord {
  id: string;
  userId?: string;
  name?: string;
  className?: string;
  timestamp: number;
  photoDataUrl: string;
}

export interface NoteItem {
  id: string;
  title: string;
  url: string;
  uploaderId?: string;
  timestamp: number;
  classId?: string; // e.g. "1".."12"
  subject?: string; // e.g. "math", "science"
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  uploaderId?: string;
  timestamp: number;
}

export interface Complaint {
  id: string;
  authorId?: string;
  category: string;
  message: string;
  timestamp: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
  description?: string;
}

const KEYS = {
  attendance: "nabhaedu.attendance",
  notes: "nabhaedu.notes",
  videos: "nabhaedu.videos",
  complaints: "nabhaedu.complaints",
  events: "nabhaedu.events",
};

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {}
}

export const Storage = {
  getAttendance(): AttendanceRecord[] {
    return read<AttendanceRecord>(KEYS.attendance);
  },
  addAttendance(rec: AttendanceRecord) {
    const all = Storage.getAttendance();
    write(KEYS.attendance, [rec, ...all]);
  },
  getNotes(): NoteItem[] {
    return read<NoteItem>(KEYS.notes);
  },
  addNote(note: NoteItem) {
    const all = Storage.getNotes();
    write(KEYS.notes, [note, ...all]);
  },
  getVideos(): VideoItem[] {
    return read<VideoItem>(KEYS.videos);
  },
  addVideo(video: VideoItem) {
    const all = Storage.getVideos();
    write(KEYS.videos, [video, ...all]);
  },
  getComplaints(): Complaint[] {
    return read<Complaint>(KEYS.complaints);
  },
  addComplaint(c: Complaint) {
    const all = Storage.getComplaints();
    write(KEYS.complaints, [c, ...all]);
  },
  getEvents(): EventItem[] {
    return read<EventItem>(KEYS.events);
  },
  addEvent(e: EventItem) {
    const all = Storage.getEvents();
    write(KEYS.events, [e, ...all]);
  },
};
