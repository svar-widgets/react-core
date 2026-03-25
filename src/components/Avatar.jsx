import { useState, useEffect, useMemo, useRef } from 'react';
import './Avatar.css';

const DEFAULT_BG = '#dfe2e6';
const DEFAULT_FONT = '#2c2f3c';

/** Overlap factor: each avatar after the first adds 75% of size (25% overlap). */
const OVERLAP_FACTOR = 0.75;

function getInitials(name) {
	name = name?.trim() || '';
	if (!name) return '';
	const words = name.split(/\s+/);
	return (words[0][0] + (words[1]?.[0] || '')).toUpperCase().slice(0, 2);
}

function getContrastColor(hex) {
	if (!hex) return DEFAULT_FONT;
	let h = hex.replace('#', '');
	if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
	if (h.length !== 6) return DEFAULT_FONT;
	const r = parseInt(h.slice(0, 2), 16) / 255;
	const g = parseInt(h.slice(2, 4), 16) / 255;
	const b = parseInt(h.slice(4, 6), 16) / 255;
	const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
	return luminance > 0.5 ? DEFAULT_FONT : '#ffffff';
}

function Avatar(props) {
	const { value, size = 32, limit } = props;

	const containerRef = useRef(null);
	const [containerWidth, setContainerWidth] = useState(null);

	const users = useMemo(() => {
		if (!value) return [];
		return Array.isArray(value) ? value : [value];
	}, [value]);

	/** Max avatars that fit in container. Formula: width = size + (n-1) * size * 0.75. */
	const maxFitting = useMemo(() => {
		if (containerWidth == null || containerWidth <= 0) {
			return null;
		}
		const n = 1 + (containerWidth / size - 1) / OVERLAP_FACTOR;
		return Math.max(1, Math.floor(n));
	}, [containerWidth, size]);

	const displayCount = useMemo(() => {
		const cap = limit != null ? Math.min(users.length, limit) : users.length;
		if (maxFitting != null) {
			return Math.min(cap, maxFitting);
		}
		return cap;
	}, [users, limit, maxFitting]);

	const displayUsers = useMemo(() => users.slice(0, displayCount), [users, displayCount]);
	const overflowCount = useMemo(() => Math.max(0, users.length - displayCount), [users, displayCount]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const ro = new ResizeObserver(entries => {
			const entry = entries[0];
			if (entry) setContainerWidth(entry.contentRect.width);
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const fontSize = Math.round(size * 0.4);
	const avatarBaseStyle = {
		width: size + 'px',
		height: size + 'px',
		minWidth: size + 'px',
		minHeight: size + 'px',
		fontSize: fontSize + 'px',
	};

	function getAvatarItemStyle(user, index) {
		const margin = index === 0 ? '0' : `${size * -0.25}px`;
		const bg = user.avatar ? 'transparent' : user.color || DEFAULT_BG;
		const color = user.avatar
			? 'transparent'
			: getContrastColor(user.color || DEFAULT_BG);
		return { marginLeft: margin, backgroundColor: bg, color };
	}

	return (
		<div className="wx-avatar-root wx-aadkRiRf" ref={containerRef}>
			{displayUsers.length > 0 && (
				<div className="wx-avatar-stack wx-aadkRiRf">
					{displayUsers.map((user, index) => (
						<div
							key={user.id}
							className={[
								'wx-avatar',
								'wx-avatar-item',
								index === displayUsers.length - 1 && overflowCount > 0
									? 'wx-avatar-overflow'
									: '',
								'wx-aadkRiRf',
							].filter(Boolean).join(' ')}
							style={{ ...avatarBaseStyle, ...getAvatarItemStyle(user, index) }}
						>
							{user.avatar ? (
								<img src={user.avatar} alt="" loading="lazy" />
							) : getInitials(user.name) ? (
								<span className="wx-aadkRiRf">{getInitials(user.name)}</span>
							) : null}
							{index === displayUsers.length - 1 && overflowCount > 0 && (
								<span className="wx-avatar-overflow-badge wx-aadkRiRf">
									+{overflowCount}
								</span>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Avatar;
