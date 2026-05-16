import os
import re

root_dir = 'projects/tot/business-test/src/lib'
core_pattern = re.compile(r"import\s+\{(.*?)\}\s+from\s+'(\.\.?/)+core/.*?';")

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            matches = core_pattern.findall(content)
            if matches:
                all_imports = []
                for m in matches:
                    imports = [i.strip() for i in m[0].split(',')]
                    all_imports.extend(imports)
                
                all_imports = sorted(list(set(filter(None, all_imports))))
                new_import_line = f"import {{ {', '.join(all_imports)} }} from '@tot/core';"
                
                # Replace all core imports with the new single one
                new_content = core_pattern.sub('', content)
                # Add the new import line at the top or after other imports
                first_match = core_pattern.search(content)
                if first_match:
                    start = first_match.start()
                    new_content = content[:start] + new_import_line + core_pattern.sub('', content[start:])
                
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Updated {path}")
