document.addEventListener('DOMContentLoaded', () => {
    // State (Load from localStorage if exists)
    let nodes = JSON.parse(localStorage.getItem('sankey_nodes')) || [];
    let links = JSON.parse(localStorage.getItem('sankey_links')) || [];
    let editingNodeIndex = null;
    let editingLinkIndex = null;

    // DOM Elements
    const nodeNameInput = document.getElementById('node-name');
    const nodeColorInput = document.getElementById('node-color');
    const autoColorCheck = document.getElementById('auto-color');
    const addNodeBtn = document.getElementById('add-node-btn');
    const nodesList = document.getElementById('nodes-list');

    const linkSourceSelect = document.getElementById('link-source');
    const linkTargetSelect = document.getElementById('link-target');
    const linkValueInput = document.getElementById('link-value');
    const addLinkBtn = document.getElementById('add-link-btn');
    const linksList = document.getElementById('links-list');

    const btnExport = document.getElementById('btn-export');
    const btnExportJson = document.getElementById('btn-export-json');
    const btnImportJson = document.getElementById('btn-import-json');
    const importFileInput = document.getElementById('import-file-input');
    const btnReset = document.getElementById('btn-reset');

    // Initialize ECharts
    const chartContainer = document.getElementById('echarts-container');
    const myChart = echarts.init(chartContainer, 'dark');

    // Handle Checkbox for auto-color
    autoColorCheck.addEventListener('change', (e) => {
        nodeColorInput.disabled = e.target.checked;
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });

    // Observe theme changes to update chart text color
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateChart();
            }
        });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    function updateChart() {
        // Save to localStorage
        localStorage.setItem('sankey_nodes', JSON.stringify(nodes));
        localStorage.setItem('sankey_links', JSON.stringify(links));

        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        const textColor = isLightMode ? '#222222' : '#ffffff';
        const watermarkColor = isLightMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)';

        // Filter out nodes that have no links so they don't pile up awkwardly on the canvas.
        // They will remain in the left-hand editor list.
        const linkedNodeNames = new Set();
        links.forEach(link => {
            linkedNodeNames.add(link.source);
            linkedNodeNames.add(link.target);
        });
        const chartNodes = nodes.filter(node => linkedNodeNames.has(node.name));

        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            graphic: [
                {
                    type: 'text',
                    right: 10,
                    bottom: 10,
                    style: {
                        text: 'zandaulion.com/sankey.html',
                        fill: watermarkColor,
                        font: '14px Outfit, sans-serif'
                    }
                }
            ],
            series: [
                {
                    type: 'sankey',
                    data: chartNodes,
                    links: links,
                    emphasis: {
                        focus: 'adjacency'
                    },
                    nodeAlign: 'justify',
                    lineStyle: {
                        color: 'source',
                        curveness: 0.5
                    },
                    label: {
                        color: textColor,
                        fontFamily: 'Outfit',
                        fontSize: 14
                    },
                    itemStyle: {
                        borderWidth: 0,
                        borderColor: textColor
                    }
                }
            ]
        };
        myChart.setOption(option, true);
        renderUI();
    }

    function renderUI() {
        // Render Nodes List
        nodesList.innerHTML = '';
        linkSourceSelect.innerHTML = '<option value="" disabled selected>Source Node</option>';
        linkTargetSelect.innerHTML = '<option value="" disabled selected>Target Node</option>';

        nodes.forEach((node, index) => {
            // Add to list
            const li = document.createElement('li');
            
            // If it has an explicit color, show it. Otherwise show a default auto indicator.
            const hasColor = node.itemStyle && node.itemStyle.color;
            const colorIndicatorStyle = hasColor ? `background-color: ${node.itemStyle.color};` : `background: linear-gradient(45deg, #00d2ff, #9d00ff);`;

            li.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <span class="color-indicator" style="${colorIndicatorStyle}"></span>
                    ${node.name}
                </div>
                <div>
                    <button class="edit-node-btn" data-index="${index}" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-right:8px; font-size:1.1rem;" title="Edit Node">&#9998;</button>
                    <button class="delete-btn" data-index="${index}" title="Remove Node">&times;</button>
                </div>
            `;
            nodesList.appendChild(li);

            // Add to selects
            const optSource = document.createElement('option');
            optSource.value = node.name;
            optSource.textContent = node.name;
            linkSourceSelect.appendChild(optSource);

            const optTarget = document.createElement('option');
            optTarget.value = node.name;
            optTarget.textContent = node.name;
            linkTargetSelect.appendChild(optTarget);
        });

        // Render Links List
        linksList.innerHTML = '';
        links.forEach((link, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${link.source}</strong> &rarr; <strong>${link.target}</strong> (${link.value})
                </div>
                <div>
                    <button class="edit-link-btn" data-index="${index}" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-right:8px; font-size:1.1rem;" title="Edit Link">&#9998;</button>
                    <button class="delete-btn" data-index="${index}" title="Remove Link">&times;</button>
                </div>
            `;
            linksList.appendChild(li);
        });
    }

    // Add / Update Node Event
    addNodeBtn.addEventListener('click', () => {
        const name = nodeNameInput.value.trim();
        const useAutoColor = autoColorCheck.checked;
        const color = nodeColorInput.value;
        if (!name) return;

        if (editingNodeIndex !== null) {
            // Update mode
            const oldName = nodes[editingNodeIndex].name;
            // Check if renaming to something that already exists elsewhere
            if (oldName !== name && nodes.find(n => n.name === name)) {
                alert('Node name already exists!');
                return;
            }
            
            nodes[editingNodeIndex].name = name;
            if (!useAutoColor) {
                nodes[editingNodeIndex].itemStyle = { color: color };
            } else {
                delete nodes[editingNodeIndex].itemStyle;
            }

            // Cascade name change to links
            if (oldName !== name) {
                links.forEach(l => {
                    if (l.source === oldName) l.source = name;
                    if (l.target === oldName) l.target = name;
                });
            }

            editingNodeIndex = null;
            addNodeBtn.textContent = 'Add Node';
        } else {
            // Add mode
            if (nodes.find(n => n.name === name)) {
                alert('Node already exists!');
                return;
            }

            const newNode = { name: name };
            if (!useAutoColor) {
                newNode.itemStyle = { color: color };
            }
            nodes.push(newNode);
        }

        nodeNameInput.value = '';
        updateChart();
    });

    // Delete / Edit Node Event
    nodesList.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.classList.contains('delete-btn')) {
            const nodeName = nodes[index].name;
            nodes.splice(index, 1);
            links = links.filter(l => l.source !== nodeName && l.target !== nodeName);
            if (editingNodeIndex === index) {
                editingNodeIndex = null;
                addNodeBtn.textContent = 'Add Node';
                nodeNameInput.value = '';
            }
            updateChart();
        } else if (e.target.classList.contains('edit-node-btn')) {
            editingNodeIndex = index;
            const node = nodes[index];
            nodeNameInput.value = node.name;
            if (node.itemStyle && node.itemStyle.color) {
                autoColorCheck.checked = false;
                nodeColorInput.disabled = false;
                nodeColorInput.value = node.itemStyle.color;
            } else {
                autoColorCheck.checked = true;
                nodeColorInput.disabled = true;
            }
            addNodeBtn.textContent = 'Update';
            nodeNameInput.focus();
        }
    });

    // Add / Update Link Event
    addLinkBtn.addEventListener('click', () => {
        const source = linkSourceSelect.value;
        const target = linkTargetSelect.value;
        const value = parseFloat(linkValueInput.value);

        if (!source || !target || isNaN(value)) {
            alert('Please fill out source, target, and value.');
            return;
        }
        if (source === target) {
            alert('Source and target cannot be the same node.');
            return;
        }

        if (editingLinkIndex !== null) {
            // Update mode
            const existingLinkIndex = links.findIndex(l => l.source === source && l.target === target);
            if (existingLinkIndex >= 0 && existingLinkIndex !== editingLinkIndex) {
                alert('This link already exists. Please edit the existing one or choose a different source/target.');
                return;
            }
            links[editingLinkIndex] = { source, target, value };
            editingLinkIndex = null;
            addLinkBtn.textContent = 'Add Link';
        } else {
            // Add mode
            const existingLinkIndex = links.findIndex(l => l.source === source && l.target === target);
            if (existingLinkIndex >= 0) {
                links[existingLinkIndex].value = value;
            } else {
                links.push({ source, target, value });
            }
        }
        
        linkValueInput.value = '';
        updateChart();
    });

    // Delete / Edit Link Event
    linksList.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.classList.contains('delete-btn')) {
            links.splice(index, 1);
            if (editingLinkIndex === index) {
                editingLinkIndex = null;
                addLinkBtn.textContent = 'Add Link';
                linkValueInput.value = '';
            }
            updateChart();
        } else if (e.target.classList.contains('edit-link-btn')) {
            editingLinkIndex = index;
            const link = links[index];
            linkSourceSelect.value = link.source;
            linkTargetSelect.value = link.target;
            linkValueInput.value = link.value;
            addLinkBtn.textContent = 'Update';
            linkValueInput.focus();
        }
    });

    function getFormattedTimestamp() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    }

    // Export Event
    btnExport.addEventListener('click', () => {
        const url = myChart.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: 'transparent'
        });
        const a = document.createElement('a');
        a.href = url;
        a.download = `zandaulion_sankey_${getFormattedTimestamp()}.png`;
        a.click();
    });

    // Export JSON Event
    btnExportJson.addEventListener('click', () => {
        const data = { nodes, links };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zandaulion_sankey_${getFormattedTimestamp()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    // Import JSON Event
    btnImportJson.addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.nodes && Array.isArray(data.nodes) && data.links && Array.isArray(data.links)) {
                    nodes = data.nodes;
                    links = data.links;
                    updateChart();
                    alert('Sankey diagram imported successfully!');
                } else {
                    alert('Invalid JSON format. Expected { nodes: [], links: [] }');
                }
            } catch (err) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
        // Reset file input so the same file can be loaded again if needed
        e.target.value = '';
    });

    // Reset Event
    btnReset.addEventListener('click', () => {
        if (nodes.length === 0 && links.length === 0) return; // Nothing to reset

        const wantToSave = confirm('Would you like to export your work to JSON before resetting?');
        if (wantToSave) {
            btnExportJson.click();
            setTimeout(() => {
                if (confirm('Data exported! Are you sure you want to completely clear the diagram now?')) {
                    nodes = [];
                    links = [];
                    updateChart();
                }
            }, 500);
        } else {
            if (confirm('Are you sure you want to completely reset the diagram? This cannot be undone.')) {
                nodes = [];
                links = [];
                updateChart();
            }
        }
    });

    // Load initial empty chart
    updateChart();
});
