import useToggleBoolean from '../useBoolean';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useBooleanHooks', () => {
  it('should return boolean value', () => {
    const toggleHooks = renderHook(() => useToggleBoolean(true));

    const result = toggleHooks.result.current.value;
    expect(typeof result).toBe('boolean');
  });

  it('should return opposite value', () => {
    const toggleHooks = renderHook(() => useToggleBoolean(true));

    act(() => {
      toggleHooks.result.current.toggle();
    });
    const result = toggleHooks.result.current.value;
    expect(false).toEqual(result);
  });
});
