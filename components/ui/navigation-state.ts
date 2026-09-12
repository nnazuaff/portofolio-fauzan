const COLLAPSE_TRIGGER = 150;
const EXPAND_SCROLL_THRESHOLD = 80;

type NavigationStateInput = {
  isExpanded: boolean;
  latest: number;
  previous: number;
  collapsePosition: number;
};

export function getNextNavigationState({
  isExpanded,
  latest,
  previous,
  collapsePosition,
}: NavigationStateInput) {
  if (isExpanded && latest > previous && latest > COLLAPSE_TRIGGER) {
    return { isExpanded: false, collapsePosition: latest };
  }

  if (!isExpanded && latest > previous) {
    return {
      isExpanded: false,
      collapsePosition: Math.max(collapsePosition, latest),
    };
  }

  if (
    !isExpanded &&
    latest < previous &&
    collapsePosition - latest > EXPAND_SCROLL_THRESHOLD
  ) {
    return { isExpanded: true, collapsePosition };
  }

  return { isExpanded, collapsePosition };
}
