import os
import re

# Directories to process
dirs_to_process = ['src/app', 'projects/tot/business-test/src/lib', 'projects/tot/business-auth/src/lib', 'projects/tot/business-files/src/lib', 'projects/tot/business-dashboard/src/lib']

# Patterns
# 1. Claim Directive (Special case - moved to core)
claim_directive_pattern = re.compile(r"import\s+\{\s*TotClaimDirective\s*\}\s+from\s+'(\.\.?/)+shared/directives/claim\.directive';")

# 2. General shared imports
shared_pattern = re.compile(r"import\s+\{(.*?)\}\s+from\s+'(\.\.?/)+shared/.*?';")
shared_explicit_pattern = re.compile(r"import\s+\{(.*?)\}\s+from\s+'@tot/shared/.*?';")

for root_dir in dirs_to_process:
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                changed = False
                
                # Handle TotClaimDirective first
                if claim_directive_pattern.search(content):
                    # Check if @tot/core is already imported
                    core_match = re.search(r"import\s+\{(.*?)\}\s+from\s+'@tot/core';", content)
                    if core_match:
                        existing_core = core_match.group(1)
                        if 'TotClaimDirective' not in existing_core:
                            new_core = f"import {{ {existing_core.strip()}, TotClaimDirective }} from '@tot/core';"
                            content = content.replace(core_match.group(0), new_core)
                    else:
                        content = "import { TotClaimDirective } from '@tot/core';\n" + content
                    
                    content = claim_directive_pattern.sub('', content)
                    changed = True
                
                # Handle other shared imports
                matches = shared_pattern.findall(content) or shared_explicit_pattern.findall(content)
                if matches:
                    all_imports = []
                    # Combine all shared imports into one from '@tot/shared'
                    for m in matches:
                        imports = [i.strip() for i in m[0].split(',')]
                        all_imports.extend(imports)
                    
                    all_imports = sorted(list(set(filter(None, all_imports))))
                    new_import_line = f"import {{ {', '.join(all_imports)} }} from '@tot/shared';"
                    
                    content = shared_pattern.sub('', content)
                    content = shared_explicit_pattern.sub('', content)
                    
                    # Prepend the new import or find a good place
                    first_import = re.search(r"import", content)
                    if first_import:
                        start = first_import.start()
                        content = content[:start] + new_import_line + "\n" + content[start:]
                    else:
                        content = new_import_line + "\n" + content
                    
                    changed = True
                
                if changed:
                    with open(path, 'w') as f:
                        f.write(content)
                    print(f"Updated {path}")
