class PixelArtGenerator {
    constructor() {
        this.pastelColors = [
            '#FFB3BA',
            '#FFDFBA',
            '#FFFFBA',
            '#BAFFC9',
            '#BAE1FF',
            '#E1BAFF',
            '#FFBAE1',
            '#C9FFBA',
            '#FFCBA4',
            '#B4E7CE'
        ];
        
        this.currentGridSize = 30;
        this.currentPattern = 'random';
        this.grid = [];
        this.selectedColor = null; 
        
        this.initializeElements();
        this.setupEventListeners();
        this.displayColorPalette();
        this.generatePixelArt();
    }
    
    initializeElements() {
        this.pixelGrid = document.getElementById('pixelGrid');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.gridSizeSelect = document.getElementById('gridSize');
        this.patternSelect = document.getElementById('pattern');
        this.colorPalette = document.getElementById('colorPalette');
    }
    
    setupEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generatePixelArt());
        this.clearBtn.addEventListener('click', () => this.clearGrid());
        this.gridSizeSelect.addEventListener('change', (e) => {
            this.currentGridSize = parseInt(e.target.value);
            this.createGrid();
        });
        this.patternSelect.addEventListener('change', (e) => {
            this.currentPattern = e.target.value;
        });
    }
    
    displayColorPalette() {
        this.colorPalette.innerHTML = '';
        this.pastelColors.forEach((color, index) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => {
                this.selectedColor = color;
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
            });
            this.colorPalette.appendChild(swatch);
        });
    }
    
    createGrid() {
        this.pixelGrid.innerHTML = '';
        this.pixelGrid.style.gridTemplateColumns = `repeat(${this.currentGridSize}, 1fr)`;
        
        this.grid = [];
        for (let i = 0; i < this.currentGridSize * this.currentGridSize; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.backgroundColor = '#f5f5f5';
            pixel.addEventListener('click', () => this.togglePixel(pixel, i));
            this.pixelGrid.appendChild(pixel);
            this.grid.push(pixel);
        }
    }
    
    togglePixel(pixel, index) {
        
        const color = this.selectedColor || this.getRandomColor();
        pixel.style.backgroundColor = color;
        pixel.classList.add('animate');
        setTimeout(() => pixel.classList.remove('animate'), 300);
    }
    
    getRandomColor() {
        return this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
    }
    
    generatePixelArt() {
      
        if (this.grid.length === 0 || this.grid.every(pixel => pixel.style.backgroundColor === '#f5f5f5' || pixel.style.backgroundColor === 'rgb(245, 245, 245)')) {
            this.createGrid();
        }
        
        setTimeout(() => {
            switch (this.currentPattern) {
                case 'random':
                    this.generateRandomPattern();
                    break;
                case 'clusters':
                    this.generateClusterPattern();
                    break;
                case 'gradient':
                    this.generateGradientPattern();
                    break;
                case 'geometric':
                    this.generateGeometricPattern();
                    break;
                case 'organic':
                    this.generateOrganicPattern();
                    break;
                default:
                    this.generateRandomPattern();
            }
        }, 100);
    }
    
    
    isPixelColored(pixel) {
        const bgColor = pixel.style.backgroundColor;
        return bgColor !== '#f5f5f5' && bgColor !== 'rgb(245, 245, 245)' && bgColor !== '' && bgColor !== 'rgb(240, 240, 240)';
    }
    
    isPixelEmpty(pixel) {
        const bgColor = pixel.style.backgroundColor;
        return bgColor === '#f5f5f5' || bgColor === 'rgb(245, 245, 245)' || bgColor === '' || bgColor === 'rgb(240, 240, 240)';
    }
    
    generateRandomPattern() {
        this.grid.forEach((pixel, index) => {
            setTimeout(() => {
                
                if (this.isPixelEmpty(pixel)) {
                    const color = this.getRandomColor();
                    pixel.style.backgroundColor = color;
                    pixel.classList.add('animate');
                    setTimeout(() => pixel.classList.remove('animate'), 300);
                }
            }, index * 3);
        });
    }
    
    generateClusterPattern() {
        this.grid.forEach((pixel, index) => {
            setTimeout(() => {
                if (this.isPixelEmpty(pixel)) {
                    pixel.style.backgroundColor = this.getRandomColor();
                    pixel.classList.add('animate');
                    setTimeout(() => pixel.classList.remove('animate'), 300);
                }
            }, index * 1);
        });
        
        
        const numClusters = Math.floor(this.currentGridSize / 2);
        
        for (let cluster = 0; cluster < numClusters; cluster++) {
            const centerX = Math.floor(Math.random() * this.currentGridSize);
            const centerY = Math.floor(Math.random() * this.currentGridSize);
            const clusterColor = this.getRandomColor();
            const clusterSize = Math.floor(Math.random() * 6) + 4;
            
            for (let dx = -clusterSize; dx <= clusterSize; dx++) {
                for (let dy = -clusterSize; dy <= clusterSize; dy++) {
                    const x = centerX + dx;
                    const y = centerY + dy;
                    
                    if (x >= 0 && x < this.currentGridSize && y >= 0 && y < this.currentGridSize) {
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance <= clusterSize) {
                            const index = y * this.currentGridSize + x;
                            setTimeout(() => {
                                this.grid[index].style.backgroundColor = clusterColor;
                                this.grid[index].classList.add('animate');
                                setTimeout(() => this.grid[index].classList.remove('animate'), 300);
                            }, (cluster + 1) * 200 + Math.floor(distance) * 10);
                        }
                    }
                }
            }
        }
    }
    
    generateGradientPattern() {
        const directions = ['horizontal', 'vertical', 'diagonal1', 'diagonal2', 'radial', 'spiral'];
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        const numColors = Math.floor(Math.random() * 3) + 2;
        const gradientColors = [];
        for (let i = 0; i < numColors; i++) {
            gradientColors.push(this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)]);
        }
        
        this.grid.forEach((pixel, index) => {
            const x = index % this.currentGridSize;
            const y = Math.floor(index / this.currentGridSize);
            
            setTimeout(() => {
               
                if (this.isPixelEmpty(pixel)) {
                    let progress;
                    
                    switch (direction) {
                        case 'horizontal':
                            progress = x / this.currentGridSize;
                            break;
                        case 'vertical':
                            progress = y / this.currentGridSize;
                            break;
                        case 'diagonal1':
                            progress = (x + y) / (this.currentGridSize * 2);
                            break;
                        case 'diagonal2':
                            progress = (x - y + this.currentGridSize) / (this.currentGridSize * 2);
                            break;
                        case 'radial':
                            const centerX = this.currentGridSize / 2;
                            const centerY = this.currentGridSize / 2;
                            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
                            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                            progress = distance / maxDistance;
                            break;
                        case 'spiral':
                            const spiralCenterX = this.currentGridSize / 2;
                            const spiralCenterY = this.currentGridSize / 2;
                            const angle = Math.atan2(y - spiralCenterY, x - spiralCenterX);
                            const spiralDistance = Math.sqrt((x - spiralCenterX) ** 2 + (y - spiralCenterY) ** 2);
                            progress = (angle + Math.PI + spiralDistance * 0.1) % (Math.PI * 2) / (Math.PI * 2);
                            break;
                        default:
                            progress = (x + y) / (this.currentGridSize * 2);
                    }
                    
                    const colorIndex = Math.floor(progress * (gradientColors.length - 1) * 0.99);
                    const color = gradientColors[Math.min(colorIndex, gradientColors.length - 1)];
                    
                    pixel.style.backgroundColor = color;
                    pixel.classList.add('animate');
                    setTimeout(() => pixel.classList.remove('animate'), 300);
                }
            }, index * 2);
        });
    }
    
    generateGeometricPattern() {
        const patterns = ['stripes', 'checkerboard', 'circles', 'diamonds'];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        
        const primaryColor = this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
        const secondaryColor = this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
        const tertiaryColor = this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
        
        this.grid.forEach((pixel, index) => {
            const x = index % this.currentGridSize;
            const y = Math.floor(index / this.currentGridSize);
            
            setTimeout(() => {
                
                let color;
                
                switch (pattern) {
                    case 'stripes':
                        const stripeWidth = 3;
                        const stripePhase = Math.floor((x + y) / stripeWidth) % 2;
                        color = stripePhase === 0 ? primaryColor : secondaryColor;
                        break;
                    case 'checkerboard':
                        const checkSize = 4;
                        const checkX = Math.floor(x / checkSize) % 2;
                        const checkY = Math.floor(y / checkSize) % 2;
                        color = (checkX + checkY) % 2 === 0 ? primaryColor : secondaryColor;
                        break;
                    case 'circles':
                        const centerX = this.currentGridSize / 2;
                        const centerY = this.currentGridSize / 2;
                        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                        const ringWidth = 3;
                        const ring = Math.floor(distance / ringWidth) % 3;
                        color = ring === 0 ? primaryColor : (ring === 1 ? secondaryColor : tertiaryColor);
                        break;
                    case 'diamonds':
                        const diamondSize = 6;
                        const diamondX = Math.abs((x % (diamondSize * 2)) - diamondSize);
                        const diamondY = Math.abs((y % (diamondSize * 2)) - diamondSize);
                        const diamondPhase = Math.floor((diamondX + diamondY) / diamondSize) % 2;
                        color = diamondPhase === 0 ? primaryColor : secondaryColor;
                        break;
                    default:
                        color = primaryColor;
                }
                
                pixel.style.backgroundColor = color;
                pixel.classList.add('animate');
                setTimeout(() => pixel.classList.remove('animate'), 300);
            }, index * 2);
        });
    }
    
    generateOrganicPattern() {
        const seeds = [];
        const numSeeds = Math.floor(this.currentGridSize / 2.5);
        
        for (let i = 0; i < numSeeds; i++) {
            seeds.push({
                x: Math.random() * this.currentGridSize,
                y: Math.random() * this.currentGridSize,
                color: this.getRandomColor(),
                influence: Math.random() * 8 + 8
            });
        }
        
        this.grid.forEach((pixel, index) => {
            const x = index % this.currentGridSize;
            const y = Math.floor(index / this.currentGridSize);
            
            let closestSeed = null;
            let minDistance = Infinity;
            
            seeds.forEach(seed => {
                const distance = Math.sqrt((x - seed.x) ** 2 + (y - seed.y) ** 2);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSeed = seed;
                }
            });
            
            setTimeout(() => {
                if (closestSeed) {
                    const influence = Math.max(0, 1 - (minDistance / closestSeed.influence));
                    let color;
                    
                    if (influence > 0.3 || minDistance < closestSeed.influence) {
                        color = closestSeed.color;
                    } else {
                        color = this.getRandomColor();
                    }
                    
                    pixel.style.backgroundColor = color;
                    pixel.classList.add('animate');
                    setTimeout(() => pixel.classList.remove('animate'), 300);
                }
            }, index * 2);
        });
    }
    
    clearGrid() {
        this.grid.forEach((pixel, index) => {
            setTimeout(() => {
                pixel.style.backgroundColor = '#f5f5f5';
                pixel.classList.add('animate');
                setTimeout(() => pixel.classList.remove('animate'), 300);
            }, index * 2);
        });
    }
}

// Initialize the pixel art generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PixelArtGenerator();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('generateBtn').click();
    } else if (e.key === 'c' || e.key === 'C') {
        document.getElementById('clearBtn').click();
    }
});
