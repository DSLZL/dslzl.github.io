import os
import json

def build_file_structure(directory):
    file_structure = []

    for entry in os.scandir(directory):
        if entry.is_file() and entry.name.endswith(".md"):
            file_structure.append({
                "name": entry.name,
                "type": "file",
                "path": os.path.relpath(entry.path, start=directory)
            })
        elif entry.is_dir():
            file_structure.append({
                "name": entry.name,
                "type": "directory",
                "children": build_file_structure(entry.path)
            })

    return file_structure

files_root = "markdown"
files = build_file_structure(files_root)

with open("files.json", "w") as f:
    json.dump(files, f, indent=2)