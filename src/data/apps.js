import {
  UserRound,
  FolderCode,
  FileText,
  Braces,
  Mail,
  Bot,
} from "lucide-react";

const apps = [
  {
    id: "About",
    label: "About",
    icon: UserRound,
    description: "Profile",
  },
  {
    id: "Projects",
    label: "Projects",
    icon: FolderCode,
    description: "Selected work",
  },
  {
    id: "Resume",
    label: "Resume",
    icon: FileText,
    description: "Experience",
  },
  {
    id: "Skills",
    label: "Skills",
    icon: Braces,
    description: "Technical stack",
  },
  {
    id: "Contact",
    label: "Contact",
    icon: Mail,
    description: "Connect",
  },
  {
    id: "AI Assistant",
    label: "Assistant",
    icon: Bot,
    description: "Ask about me",
  },
];

export default apps;
