const fs = require('fs');

const files = [
    'dashboard.html',
    'reports.html',
    'upload.html',
    'chat.html',
    'settings.html',
    'profile.html'
];

const footerHtml = `
<!-- Global Processing Status Bar -->
<div class="fixed bottom-0 left-0 md:left-64 right-0 bg-surface-container-highest border-t border-outline-variant p-4 z-[100] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div class="flex flex-col flex-1 gap-1">
            <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                <span>System Processing Status</span>
                <span id="global-status-text">Idle</span>
            </div>
            <div class="w-full bg-surface-container-lowest border border-outline-variant h-1.5 rounded overflow-hidden">
                <div id="global-progress-bar" class="bg-primary h-full transition-all duration-300" style="width: 0%"></div>
            </div>
        </div>
        <button class="text-[10px] font-black uppercase border border-outline-variant px-3 py-1.5 hover:bg-surface-container-lowest transition-colors rounded bg-background">View Logs</button>
    </div>
</div>
`;

files.forEach(file => {
    const filePath = 'c:/Users/harsh/Downloads/AWS_Program/AI-powered ESG and Carbon Compliance Platform/frontend/' + file;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add padding to main
    content = content.replace(
        '<main class="flex-1 overflow-y-auto no-scrollbar bg-background p-4 md:p-6 lg:p-8">',
        '<main class="flex-1 overflow-y-auto no-scrollbar bg-background p-4 md:p-6 lg:p-8 pb-24 md:pb-24 lg:pb-24">'
    );
    
    // Remove old footer if it exists to make script idempotent
    if (content.includes('<!-- Global Processing Status Bar -->')) {
        const start = content.indexOf('<!-- Global Processing Status Bar -->');
        const end = content.indexOf('</body>');
        content = content.substring(0, start) + '</body>' + content.substring(end + 7);
    }
    
    // Inject footer
    content = content.replace('</body>', footerHtml + '</body>');
    
    fs.writeFileSync(filePath, content);
});
