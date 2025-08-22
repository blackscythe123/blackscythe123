import os
import shutil
from pathlib import Path

def organize_downloads():
    # Get the Downloads folder path
    downloads_path = Path.home() / "Downloads"
    
    # Dictionary to map file extensions to folder names
    file_types = {
        '.pdf': 'pdf',
        '.doc': 'doc',
        '.docx': 'docx',
        '.xlsx':'excel',
        '.xls':'excel',
        '.ppt':'ppt',
        '.pptx':'ppt',
        '.csv':'csv',
        '.json':'JSON',
        '.txt': 'text',
        '.jpg': 'Images',
        '.png': 'Images',
        '.gif': 'Images',
        '.jpeg': 'Images',
        '.mp4': 'Videos',
        '.mov': 'Videos',
        '.avi': 'Videos',
        '.mp3': 'Music',
        '.wav': 'Music',
        '.zip': 'Archives',
        '.rar': 'Archives',
        '.exe': 'Programs',
        '.msi': 'Programs',
        '.py': 'PYTHON',
        '.java': 'JAVA',
        '.js': 'Code',
        '.html': 'HTML',
        '.css': 'CSS',
        '.php': 'PHP',
        '.cpp': 'C++',
        '.cxx': 'C++',
        '.h': 'C++',
        '.hpp': 'C++',
        '.cs': 'C#',        
        '.c':'C',
        '.ipynb': 'Jupyter Notebooks',
        '.sh': 'Shell Scripts',
        '.md': 'Markdown',
        '.latex': 'LaTeX',
        '.tex': 'LaTeX',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.xml': 'XML',
        '.svg': 'SVG',
        '.txt': 'Text',
        '.log': 'Logs',
        '.torrent': 'Torrents',
        '.apk': 'Android Apps',
        '.dmg': 'Mac Apps',
        '.iso': 'ISOs',
        '.psd': 'Photoshop',
        '.ai': 'Illustrator',
        '.indd': 'InDesign',
        '.eps': 'EPS',
        '.ttf': 'Fonts',
    }

    # Create folders if they don't exist
    for folder in set(file_types.values()):
        folder_path = downloads_path / folder
        folder_path.mkdir(exist_ok=True)

    # Iterate through files in Downloads
    for item in downloads_path.iterdir():
        # Skip if it's a directory
        if item.is_dir():
            continue
            
        # Get file extension
        extension = item.suffix.lower()
        
        # Check if extension is in our mapping
        if extension in file_types:
            destination_folder = downloads_path / file_types[extension]
            destination_path = destination_folder / item.name
            
            # Handle duplicate files
            counter = 1
            while destination_path.exists():
                base_name = item.stem
                new_name = f"{base_name}_{counter}{extension}"
                destination_path = destination_folder / new_name
                counter += 1
            
            try:
                # Move the file
                shutil.move(str(item), str(destination_path))
                print(f"Moved {item.name} to {file_types[extension]}")
            except Exception as e:
                print(f"Error moving {item.name}: {e}")
        else:
            # Create 'Others' folder for unmapped extensions
            others_folder = downloads_path / 'Others'
            others_folder.mkdir(exist_ok=True)
            
            destination_path = others_folder / item.name
            counter = 1
            while destination_path.exists():
                base_name = item.stem
                new_name = f"{base_name}_{counter}{extension}"
                destination_path = others_folder / new_name
                counter += 1
                
            try:
                shutil.move(str(item), str(destination_path))
                print(f"Moved {item.name} to Others")
            except Exception as e:
                print(f"Error moving {item.name}: {e}")

if __name__ == "__main__":
    print("Organizing Downloads folder...")
    organize_downloads()
    print("Organization complete!")