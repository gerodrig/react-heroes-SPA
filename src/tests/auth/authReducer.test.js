import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Tests in authReducer', () => {
	test('should return the initial state', () => {
		const state = authReducer({ isAuthenticated: false }, {});

		expect(state).toEqual({ isAuthenticated: false });
	});

	test('should authenticate and inster username in Navbar', () => {
		const action = {
			type: types.login,
			payload: {
				name: 'Gerardo',
			},
		};

        const state = authReducer({ isAuthenticated: false }, action);

		expect(state).toEqual({
			isAuthenticated: true,
			name: 'Gerardo',
		});
	});

    test('should logout and remove username from Navbar', () => {
        const action = {
            type: types.logout,
        };

        const state = authReducer({ isAuthenticated: true, name: 'Gerardo' }, action);

        expect(state).toEqual({
            isAuthenticated: false
        });
    });
});
