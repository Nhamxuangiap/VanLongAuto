document.documentElement.dataset.theme = 'light';

document.addEventListener('DOMContentLoaded', () => {
	const pageName = location.pathname.split('/').pop() || '';
	if (!pageName.startsWith('san-pham-') || document.querySelector('.floating-action-menu')) return;

	document.body.insertAdjacentHTML('beforeend', `
		<div class="floating-action-menu">
			<div class="cta-map-wrap">
				<button type="button" class="cta-btn cta-map" id="mapToggle" aria-label="Chọn cơ sở trên bản đồ" aria-expanded="false" aria-controls="mapBranchMenu">
					<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>
					</svg>
					<span class="cta-label">Map</span>
				</button>
				<div class="map-branch-menu" id="mapBranchMenu" aria-label="Chọn cơ sở" hidden>
					<a class="map-branch-link" href="https://www.google.com/maps/search/?api=1&amp;query=3HA+Th%C6%B0%C6%A1ng+M%E1%BA%A1i+Khu+X7+X%C3%A3+%C4%90%C3%B4ng+Anh+H%C3%A0+N%E1%BB%99i" target="_blank" rel="noopener noreferrer">Cơ Sở Đông Anh</a>
					<a class="map-branch-link" href="https://maps.app.goo.gl/2RRWWSwhNe3cemxd7" target="_blank" rel="noopener noreferrer">Cơ Sở Bắc Ninh</a>
				</div>
			</div>
			<a href="tel:+84886636338" class="cta-btn cta-phone" aria-label="Gọi ngay">
				<svg viewBox="0 0 24 24" fill="white" width="22" height="22" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
				<span class="cta-label">0886.636.338</span>
			</a>
			<a href="https://www.facebook.com/messages/t/vanlongauto.cs3" target="_blank" rel="noopener noreferrer" class="cta-btn cta-messenger" aria-label="Chat Messenger">
				<svg viewBox="0 0 24 24" fill="white" width="24" height="24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.5 5.51 3.84 7.24v3.91l3.52-1.93c.85.24 1.74.37 2.64.37 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.09 12.38l-2.73-2.91-5.32 2.91 5.86-6.22 2.83 2.91 5.22-2.91-5.86 6.22z"/></svg>
				<span class="cta-label">Chat Messenger</span>
			</a>
			<a href="https://zalo.me/0886636338" target="_blank" rel="noopener noreferrer" class="cta-btn cta-zalo" aria-label="Chat Zalo">
				<svg viewBox="0 0 100 100" width="24" height="24" aria-hidden="true"><path d="M50,15 C25.147,15 5,31.785 5,52.5 C5,63.766 11.23,73.882 21.054,80.316 C20.485,83.916 16.924,89.516 12.822,93.43 C12.822,93.43 23.364,94.27 34.331,88.428 C39.261,90.222 44.526,91.196 50,91.196 C74.853,91.196 95,74.411 95,53.696 C95,32.981 74.853,15 50,15 Z" fill="white"/><text fill="#0068FF" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" x="50" y="62">Zalo</text></svg>
				<span class="cta-label">Chat Zalo</span>
			</a>
		</div>
	`);

	const mapToggle = document.querySelector('#mapToggle');
	const mapMenu = document.querySelector('#mapBranchMenu');
	const closeMapMenu = () => {
		mapMenu.hidden = true;
		mapToggle.setAttribute('aria-expanded', 'false');
	};

	mapToggle.addEventListener('click', () => {
		const open = mapMenu.hidden;
		mapMenu.hidden = !open;
		mapToggle.setAttribute('aria-expanded', String(open));
	});
	document.addEventListener('click', event => {
		if (!mapMenu.hidden && !mapMenu.contains(event.target) && !mapToggle.contains(event.target)) closeMapMenu();
	});
	document.addEventListener('keydown', event => {
		if (event.key !== 'Escape' || mapMenu.hidden) return;
		closeMapMenu();
		mapToggle.focus();
	});
});